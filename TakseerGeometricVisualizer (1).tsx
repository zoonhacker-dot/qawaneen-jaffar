import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TakseerResult, ElementType } from '../types';
import { ABJAD_TABLE, URDU_LETTER_EQUIVALENTS } from '../utils/jafrEngine';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Sparkles, 
  Layers, 
  CircleDot, 
  Activity, 
  Compass,
  Eye,
  Info
} from 'lucide-react';

interface TakseerGeometricVisualizerProps {
  takseerResult: TakseerResult;
  selectedLetterHighlight?: string | null;
  onSelectLetter?: (letter: string | null) => void;
}

type ViewMode = 'mandala' | 'lattice' | 'orbit';

interface LetterNodeData {
  id: string;
  step: number;
  index: number;
  letter: string;
  element: ElementType;
  elementUrdu: string;
  kabir: number;
  x?: number;
  y?: number;
  angle?: number;
  radius?: number;
}

interface LetterLinkData {
  sourceId: string;
  targetId: string;
  letter: string;
  fromStep: number;
  toStep: number;
  fromIndex: number;
  toIndex: number;
  element: ElementType;
  isSadr: boolean;
  isMuakhkhar: boolean;
  source?: LetterNodeData;
  target?: LetterNodeData;
}

export const TakseerGeometricVisualizer: React.FC<TakseerGeometricVisualizerProps> = ({
  takseerResult,
  selectedLetterHighlight = null,
  onSelectLetter,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>('mandala');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeLetter, setActiveLetter] = useState<string | null>(selectedLetterHighlight);
  const [showParticles, setShowParticles] = useState<boolean>(true);
  const [colorByElement, setColorByElement] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [hoveredNode, setHoveredNode] = useState<LetterNodeData | null>(null);

  const totalSteps = takseerResult.steps.length;

  // Sync internal letter state if prop changes
  useEffect(() => {
    if (selectedLetterHighlight !== undefined) {
      setActiveLetter(selectedLetterHighlight);
    }
  }, [selectedLetterHighlight]);

  const handleLetterSelect = (letter: string | null) => {
    const next = activeLetter === letter ? null : letter;
    setActiveLetter(next);
    if (onSelectLetter) onSelectLetter(next);
  };

  // Color mapping helper
  const getElementColor = (el: ElementType, isHighlighted = false): string => {
    if (!colorByElement) {
      return isHighlighted ? '#bc6c25' : '#5d4037';
    }
    switch (el) {
      case 'fire':
        return isHighlighted ? '#e63946' : '#d90429';
      case 'air':
        return isHighlighted ? '#f4a261' : '#e76f51';
      case 'water':
        return isHighlighted ? '#457b9d' : '#1d3557';
      case 'earth':
        return isHighlighted ? '#606c38' : '#283618';
      default:
        return '#bc6c25';
    }
  };

  const getLetterElement = (letter: string): { element: ElementType; elementUrdu: string; kabir: number } => {
    const normalized = URDU_LETTER_EQUIVALENTS[letter] || letter;
    const info = ABJAD_TABLE[normalized] || ABJAD_TABLE['ا'];
    return {
      element: info ? info.element : 'fire',
      elementUrdu: info ? info.elementUrdu : 'آتشی',
      kabir: info ? info.abjadKabir : 1,
    };
  };

  // Autoplay animation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => (prev >= totalSteps ? 1 : prev + 1));
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps]);

  // Main D3 Rendering Effect
  useEffect(() => {
    if (!svgRef.current || !takseerResult.steps.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const width = 800;
    const height = 540;
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    // Definitions (filters, gradients, markers)
    const defs = svg.append('defs');

    // Glow filter
    const filter = defs.append('filter').attr('id', 'gold-glow').attr('x', '-30%').attr('y', '-30%').attr('width', '160%').attr('height', '160%');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'blur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'blur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Arrow markers for lattice mode
    defs.append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 18)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-4L10,0L0,4')
      .attr('fill', '#bc6c25');

    // Main drawing group with zoom support
    const g = svg.append('g').attr('class', 'main-canvas');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.6, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Prepare Node and Link Data
    const nodeMap = new Map<string, LetterNodeData>();
    const links: LetterLinkData[] = [];

    takseerResult.steps.forEach((st) => {
      st.letters.forEach((char, idx) => {
        const nodeId = `step-${st.stepNumber}-idx-${idx}`;
        const { element, elementUrdu, kabir } = getLetterElement(char);
        nodeMap.set(nodeId, {
          id: nodeId,
          step: st.stepNumber,
          index: idx,
          letter: char,
          element,
          elementUrdu,
          kabir,
        });
      });
    });

    // Build transitions (from step to step+1)
    for (let s = 1; s < totalSteps; s++) {
      const currStep = takseerResult.steps[s - 1];
      const nextStep = takseerResult.steps[s];

      // Track movement of each letter from currStep to nextStep
      const usedNextIdx = new Set<number>();
      currStep.letters.forEach((char, cIdx) => {
        // Find matching position in nextStep
        let targetIdx = -1;
        for (let nIdx = 0; nIdx < nextStep.letters.length; nIdx++) {
          if (nextStep.letters[nIdx] === char && !usedNextIdx.has(nIdx)) {
            targetIdx = nIdx;
            usedNextIdx.add(nIdx);
            break;
          }
        }
        if (targetIdx !== -1) {
          const sourceId = `step-${currStep.stepNumber}-idx-${cIdx}`;
          const targetId = `step-${nextStep.stepNumber}-idx-${targetIdx}`;
          const isSadr = targetIdx % 2 === 0;
          const isMuakhkhar = targetIdx % 2 !== 0;
          const { element } = getLetterElement(char);

          links.push({
            sourceId,
            targetId,
            letter: char,
            fromStep: currStep.stepNumber,
            toStep: nextStep.stepNumber,
            fromIndex: cIdx,
            toIndex: targetIdx,
            element,
            isSadr,
            isMuakhkhar,
          });
        }
      });
    }

    // Connect node references in links
    links.forEach((l) => {
      l.source = nodeMap.get(l.sourceId);
      l.target = nodeMap.get(l.targetId);
    });

    // -------------------------------------------------------------
    // RENDER MODE 1: MANDALA / SACRED CIRCULAR ORBIT (دائرۂ تسخیر)
    // -------------------------------------------------------------
    if (viewMode === 'mandala' || viewMode === 'orbit') {
      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.38;
      const numLetters = takseerResult.steps[0].letters.length;

      // Outer sacred decorative rings
      g.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', baseRadius + 30)
        .attr('fill', 'none')
        .attr('stroke', '#d4a373')
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '4 4')
        .attr('opacity', 0.6);

      g.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', baseRadius)
        .attr('fill', '#fdfaf1')
        .attr('stroke', '#bc6c25')
        .attr('stroke-width', 2)
        .attr('opacity', 0.9);

      g.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', baseRadius * 0.35)
        .attr('fill', '#f2e8cf')
        .attr('stroke', '#d4a373')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0.8);

      // Central symbol / name
      g.append('text')
        .attr('x', centerX)
        .attr('y', centerY - 6)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Amiri, serif')
        .attr('font-size', '20px')
        .attr('font-weight', 'bold')
        .attr('fill', '#5d4037')
        .text(takseerResult.originalText);

      g.append('text')
        .attr('x', centerX)
        .attr('y', centerY + 18)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .attr('fill', '#bc6c25')
        .text(`سطر ${activeStep} از ${totalSteps}`);

      // Calculate radial positions for each slot on the circle
      const angleStep = (2 * Math.PI) / numLetters;
      const slotCoords: { x: number; y: number; angle: number }[] = [];
      for (let i = 0; i < numLetters; i++) {
        // Start from top (angle - PI/2)
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + baseRadius * Math.cos(angle);
        const y = centerY + baseRadius * Math.sin(angle);
        slotCoords.push({ x, y, angle });
      }

      // Draw sacred geometric background chords between all polygon vertices
      for (let i = 0; i < numLetters; i++) {
        for (let j = i + 1; j < numLetters; j++) {
          g.append('line')
            .attr('x1', slotCoords[i].x)
            .attr('y1', slotCoords[i].y)
            .attr('x2', slotCoords[j].x)
            .attr('y2', slotCoords[j].y)
            .attr('stroke', '#e7d8c9')
            .attr('stroke-width', 0.8)
            .attr('opacity', 0.4);
        }
      }

      // Filter active links to render
      // In mandala mode, show links up to current activeStep, or all links if paused and no specific step
      const visibleLinks = links.filter((l) => {
        if (activeLetter && l.letter !== activeLetter) return false;
        if (viewMode === 'orbit') {
          return l.toStep === activeStep;
        }
        return l.toStep <= activeStep;
      });

      // Draw curved permutation chords across the mandala
      const linkGroup = g.append('g').attr('class', 'chord-links');

      visibleLinks.forEach((l) => {
        const fromCoord = slotCoords[l.fromIndex];
        const toCoord = slotCoords[l.toIndex];
        const isCurrentStep = l.toStep === activeStep;
        const isSelected = activeLetter === l.letter;
        const strokeColor = getElementColor(l.element, isSelected || isCurrentStep);

        // Compute curved path pulling toward center
        const midX = (fromCoord.x + toCoord.x) / 2;
        const midY = (fromCoord.y + toCoord.y) / 2;
        const pull = 0.4;
        const ctrlX = midX * (1 - pull) + centerX * pull;
        const ctrlY = midY * (1 - pull) + centerY * pull;

        const pathStr = `M ${fromCoord.x} ${fromCoord.y} Q ${ctrlX} ${ctrlY} ${toCoord.x} ${toCoord.y}`;

        const path = linkGroup.append('path')
          .attr('d', pathStr)
          .attr('fill', 'none')
          .attr('stroke', strokeColor)
          .attr('stroke-width', isSelected ? 3.5 : isCurrentStep ? 2.8 : 1.5)
          .attr('stroke-opacity', isSelected ? 1 : isCurrentStep ? 0.9 : 0.4)
          .attr('stroke-dasharray', isCurrentStep ? 'none' : '2 2');

        if (isSelected || isCurrentStep) {
          path.attr('filter', 'url(#gold-glow)');
        }

        // Animated flow particles along the chords
        if (showParticles && (isCurrentStep || isSelected)) {
          const particle = linkGroup.append('circle')
            .attr('r', 4)
            .attr('fill', strokeColor)
            .attr('filter', 'url(#gold-glow)');

          const animateParticle = () => {
            particle
              .transition()
              .duration(1200)
              .ease(d3.easeCubicInOut)
              .attrTween('transform', () => {
                return (t: number) => {
                  const p0 = fromCoord;
                  const p1 = { x: ctrlX, y: ctrlY };
                  const p2 = toCoord;
                  const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
                  const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
                  return `translate(${x}, ${y})`;
                };
              })
              .on('end', () => {
                if (showParticles) animateParticle();
              });
          };
          animateParticle();
        }
      });

      // Render the Letter Nodes along the circular perimeter
      const currentStepData = takseerResult.steps[activeStep - 1] || takseerResult.steps[0];
      const nodeGroup = g.append('g').attr('class', 'mandala-nodes');

      slotCoords.forEach((coord, idx) => {
        const char = currentStepData.letters[idx] || '';
        const { element, elementUrdu, kabir } = getLetterElement(char);
        const isLetterActive = activeLetter === char;
        const nodeColor = getElementColor(element, isLetterActive);

        const nodeG = nodeGroup.append('g')
          .attr('class', 'node-item')
          .attr('transform', `translate(${coord.x}, ${coord.y})`)
          .style('cursor', 'pointer')
          .on('click', () => handleLetterSelect(char))
          .on('mouseenter', () => {
            setHoveredNode({
              id: `slot-${idx}`,
              step: activeStep,
              index: idx,
              letter: char,
              element,
              elementUrdu,
              kabir,
            });
          })
          .on('mouseleave', () => setHoveredNode(null));

        // Node circle background
        nodeG.append('circle')
          .attr('r', isLetterActive ? 22 : 18)
          .attr('fill', isLetterActive ? '#faedcd' : '#ffffff')
          .attr('stroke', nodeColor)
          .attr('stroke-width', isLetterActive ? 3 : 2)
          .attr('filter', isLetterActive ? 'url(#gold-glow)' : 'none')
          .transition()
          .duration(300);

        // Letter index badge
        nodeG.append('text')
          .attr('y', -24)
          .attr('text-anchor', 'middle')
          .attr('font-size', '10px')
          .attr('font-weight', 'bold')
          .attr('fill', '#8d6e63')
          .text(`مقام ${idx + 1}`);

        // Letter glyph
        nodeG.append('text')
          .attr('y', 6)
          .attr('text-anchor', 'middle')
          .attr('font-family', 'Amiri, serif')
          .attr('font-size', isLetterActive ? '22px' : '18px')
          .attr('font-weight', 'bold')
          .attr('fill', isLetterActive ? '#bc6c25' : '#5d4037')
          .text(char);

        // Kabir value badge below
        if (showLabels) {
          nodeG.append('text')
            .attr('y', 30)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('font-weight', 'bold')
            .attr('fill', nodeColor)
            .text(`${elementUrdu} (${kabir})`);
        }
      });
    }

    // -------------------------------------------------------------
    // RENDER MODE 2: LATTICE / BRAIDING FLOW DAG (شبکۂ بسط و گردش)
    // -------------------------------------------------------------
    if (viewMode === 'lattice') {
      const numLetters = takseerResult.steps[0].letters.length;
      const margin = { top: 40, right: 60, bottom: 40, left: 70 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const colWidth = innerWidth / (numLetters - 1 || 1);
      const rowHeight = innerHeight / (totalSteps - 1 || 1);

      // Assign x, y positions to all nodes
      nodeMap.forEach((node) => {
        node.x = margin.left + (numLetters - 1 - node.index) * colWidth; // Right-to-left
        node.y = margin.top + (node.step - 1) * rowHeight;
      });

      // Background Step Indicator Lines and Labels
      takseerResult.steps.forEach((st, sIdx) => {
        const y = margin.top + sIdx * rowHeight;
        const isCurrent = st.stepNumber === activeStep;

        // Horizontal baseline
        g.append('line')
          .attr('x1', margin.left - 20)
          .attr('y1', y)
          .attr('x2', width - margin.right + 20)
          .attr('y2', y)
          .attr('stroke', isCurrent ? '#bc6c25' : '#e7d8c9')
          .attr('stroke-width', isCurrent ? 2 : 1)
          .attr('stroke-dasharray', isCurrent ? 'none' : '3 3')
          .attr('opacity', isCurrent ? 0.9 : 0.5);

        // Step Label (Left side)
        g.append('text')
          .attr('x', margin.left - 28)
          .attr('y', y + 4)
          .attr('text-anchor', 'end')
          .attr('font-size', '11px')
          .attr('font-weight', isCurrent ? 'bold' : 'normal')
          .attr('fill', isCurrent ? '#bc6c25' : '#8d6e63')
          .text(`سطر ${st.stepNumber}`);

        // Extracted name (Right side)
        if (st.extractedName) {
          g.append('text')
            .attr('x', width - margin.right + 28)
            .attr('y', y + 4)
            .attr('text-anchor', 'start')
            .attr('font-family', 'Amiri, serif')
            .attr('font-size', '13px')
            .attr('font-weight', 'bold')
            .attr('fill', '#bc6c25')
            .text(st.extractedName);
        }
      });

      // Draw Bezier Connection Ribbons / Braids
      const linkGroup = g.append('g').attr('class', 'lattice-links');

      links.forEach((l) => {
        if (!l.source || !l.target) return;
        const isSelected = activeLetter === l.letter;
        const isPassed = l.toStep <= activeStep;
        const strokeColor = getElementColor(l.element, isSelected);

        const x0 = l.source.x || 0;
        const y0 = l.source.y || 0;
        const x1 = l.target.x || 0;
        const y1 = l.target.y || 0;

        const cy0 = y0 + rowHeight * 0.5;
        const cy1 = y1 - rowHeight * 0.5;

        const pathStr = `M ${x0} ${y0} C ${x0} ${cy0}, ${x1} ${cy1}, ${x1} ${y1}`;

        const path = linkGroup.append('path')
          .attr('d', pathStr)
          .attr('fill', 'none')
          .attr('stroke', strokeColor)
          .attr('stroke-width', isSelected ? 3.5 : isPassed ? 2 : 1)
          .attr('stroke-opacity', isSelected ? 1 : isPassed ? 0.7 : 0.25)
          .attr('stroke-dasharray', isPassed ? 'none' : '2 2');

        if (isSelected) {
          path.attr('filter', 'url(#gold-glow)');
        }

        // Particle stream on lattice
        if (showParticles && isSelected && isPassed) {
          const particle = linkGroup.append('circle')
            .attr('r', 3.5)
            .attr('fill', strokeColor)
            .attr('filter', 'url(#gold-glow)');

          const animateLatticeParticle = () => {
            particle
              .transition()
              .duration(1500)
              .ease(d3.easeLinear)
              .attrTween('transform', () => {
                return (t: number) => {
                  // Cubic bezier calculation
                  const u = 1 - t;
                  const tt = t * t;
                  const uu = u * u;
                  const uuu = uu * u;
                  const ttt = tt * t;

                  const x = uuu * x0 + 3 * uu * t * x0 + 3 * u * tt * x1 + ttt * x1;
                  const y = uuu * y0 + 3 * uu * t * cy0 + 3 * u * tt * cy1 + ttt * y1;
                  return `translate(${x}, ${y})`;
                };
              })
              .on('end', () => {
                if (showParticles) animateLatticeParticle();
              });
          };
          animateLatticeParticle();
        }
      });

      // Render Nodes in Lattice
      const nodeGroup = g.append('g').attr('class', 'lattice-nodes');

      nodeMap.forEach((node) => {
        const isCurrentStep = node.step === activeStep;
        const isLetterActive = activeLetter === node.letter;
        const nodeColor = getElementColor(node.element, isLetterActive);

        const nodeG = nodeGroup.append('g')
          .attr('transform', `translate(${node.x}, ${node.y})`)
          .style('cursor', 'pointer')
          .on('click', () => handleLetterSelect(node.letter))
          .on('mouseenter', () => setHoveredNode(node))
          .on('mouseleave', () => setHoveredNode(null));

        nodeG.append('circle')
          .attr('r', isLetterActive ? 16 : isCurrentStep ? 14 : 11)
          .attr('fill', isLetterActive ? '#faedcd' : isCurrentStep ? '#ffffff' : '#fdfaf1')
          .attr('stroke', nodeColor)
          .attr('stroke-width', isLetterActive ? 3 : isCurrentStep ? 2.2 : 1.5)
          .attr('filter', isLetterActive ? 'url(#gold-glow)' : 'none');

        nodeG.append('text')
          .attr('y', 5)
          .attr('text-anchor', 'middle')
          .attr('font-family', 'Amiri, serif')
          .attr('font-size', isLetterActive ? '16px' : '13px')
          .attr('font-weight', 'bold')
          .attr('fill', isLetterActive ? '#bc6c25' : '#5d4037')
          .text(node.letter);
      });
    }

  }, [takseerResult, viewMode, activeStep, activeLetter, showParticles, colorByElement, showLabels]);

  // Zoom controls
  const handleZoom = (factor: number) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(d3.zoom<SVGSVGElement, unknown>().scaleBy, factor);
  };

  const handleResetZoom = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(400).call(d3.zoom<SVGSVGElement, unknown>().transform, d3.zoomIdentity);
  };

  // Export SVG graphic
  const handleDownloadSVG = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Takseer-Geometry-${takseerResult.originalText}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uniqueLetters: string[] = Array.from(new Set<string>(takseerResult.steps[0]?.letters || []));

  return (
    <div className="space-y-4" ref={containerRef}>
      {/* Visualizer Top Control Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl border-2 border-[#d4a373] bg-[#f9f4e8] shadow-sm">
        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#ffffff] rounded-xl border border-[#e7d8c9] shadow-inner">
          <button
            onClick={() => setViewMode('mandala')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'mandala'
                ? 'bg-[#bc6c25] text-white shadow-xs'
                : 'text-[#5d4037] hover:bg-[#faedcd]'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>دائرۂ تسخیر (Mandala)</span>
          </button>
          <button
            onClick={() => setViewMode('lattice')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'lattice'
                ? 'bg-[#bc6c25] text-white shadow-xs'
                : 'text-[#5d4037] hover:bg-[#faedcd]'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>شبکۂ بسط (Lattice)</span>
          </button>
          <button
            onClick={() => setViewMode('orbit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'orbit'
                ? 'bg-[#bc6c25] text-white shadow-xs'
                : 'text-[#5d4037] hover:bg-[#faedcd]'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>مدارِ لحظی (Step Orbit)</span>
          </button>
        </div>

        {/* Playback Controls & Scrubber */}
        <div className="flex items-center gap-3 flex-1 max-w-md justify-end">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center justify-center h-9 w-9 rounded-xl bg-[#bc6c25] hover:bg-[#a65d1e] text-white shadow-xs transition-colors cursor-pointer shrink-0"
            title={isPlaying ? 'روکیں' : 'چلائیں'}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveStep(1);
            }}
            className="flex items-center justify-center h-9 w-9 rounded-xl border border-[#d4a373] bg-[#ffffff] hover:bg-[#faedcd] text-[#5d4037] shadow-xs transition-colors cursor-pointer shrink-0"
            title="شروع سے"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Step Slider */}
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs font-bold text-[#5d4037] whitespace-nowrap">
              سطر {activeStep}/{totalSteps}
            </span>
            <input
              type="range"
              min={1}
              max={totalSteps}
              value={activeStep}
              onChange={(e) => {
                setIsPlaying(false);
                setActiveStep(parseInt(e.target.value));
              }}
              className="w-full accent-[#bc6c25] cursor-pointer"
            />
          </div>
        </div>

        {/* Tool toggles & Zoom */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowParticles(!showParticles)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              showParticles ? 'bg-[#faedcd] border-[#bc6c25] text-[#bc6c25]' : 'bg-[#ffffff] border-[#e7d8c9] text-[#8d6e63]'
            }`}
            title="حرکتِ انوار / Particles"
          >
            <Sparkles className="h-4 w-4" />
          </button>

          <button
            onClick={() => setColorByElement(!colorByElement)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              colorByElement ? 'bg-[#faedcd] border-[#bc6c25] text-[#bc6c25]' : 'bg-[#ffffff] border-[#e7d8c9] text-[#8d6e63]'
            }`}
            title="رنگِ عناصر / Elemental Colors"
          >
            <CircleDot className="h-4 w-4" />
          </button>

          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              showLabels ? 'bg-[#faedcd] border-[#bc6c25] text-[#bc6c25]' : 'bg-[#ffffff] border-[#e7d8c9] text-[#8d6e63]'
            }`}
            title="تفصیلات و اعداد"
          >
            <Eye className="h-4 w-4" />
          </button>

          <div className="h-5 w-[1px] bg-[#d4a373] mx-1" />

          <button
            onClick={() => handleZoom(1.2)}
            className="p-2 rounded-xl border border-[#e7d8c9] bg-[#ffffff] hover:bg-[#faedcd] text-[#5d4037] transition-colors cursor-pointer"
            title="بڑا کریں"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <button
            onClick={() => handleZoom(0.8)}
            className="p-2 rounded-xl border border-[#e7d8c9] bg-[#ffffff] hover:bg-[#faedcd] text-[#5d4037] transition-colors cursor-pointer"
            title="چھوٹا کریں"
          >
            <ZoomOut className="h-4 w-4" />
          </button>

          <button
            onClick={handleResetZoom}
            className="p-2 rounded-xl border border-[#e7d8c9] bg-[#ffffff] hover:bg-[#faedcd] text-[#5d4037] transition-colors cursor-pointer"
            title="اصل حالت"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={handleDownloadSVG}
            className="p-2 rounded-xl border border-[#d4a373] bg-[#bc6c25] hover:bg-[#a65d1e] text-white transition-colors cursor-pointer shadow-xs"
            title="تصویر برآمد کریں (Download SVG)"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Individual Letter Tracing Chips */}
      <div className="flex flex-wrap items-center gap-2 px-2 py-1">
        <span className="text-xs font-bold text-[#5d4037]">تتبعِ انفرادی حرف (Highlight Path):</span>
        <button
          onClick={() => handleLetterSelect(null)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeLetter === null
              ? 'bg-[#5d4037] text-white shadow-xs'
              : 'bg-[#ffffff] border border-[#d4a373] text-[#5d4037] hover:bg-[#faedcd]'
          }`}
        >
          تمام حروف
        </button>
        {uniqueLetters.map((char, idx) => {
          const isSelected = activeLetter === char;
          const { element, elementUrdu } = getLetterElement(char);
          const color = getElementColor(element, isSelected);
          return (
            <button
              key={idx}
              onClick={() => handleLetterSelect(char)}
              style={{
                borderColor: color,
                backgroundColor: isSelected ? color : '#ffffff',
                color: isSelected ? '#ffffff' : color,
              }}
              className="px-3 py-1 rounded-full text-xs font-bold border-2 transition-all cursor-pointer font-amiri text-sm shadow-xs hover:scale-105"
            >
              حرف '{char}' ({elementUrdu})
            </button>
          );
        })}
      </div>

      {/* D3 Canvas Container */}
      <div className="relative rounded-2xl border-2 border-[#d4a373] bg-[#ffffff] shadow-md overflow-hidden flex items-center justify-center p-2 min-h-[540px]">
        <svg
          ref={svgRef}
          className="w-full h-[540px] cursor-grab active:cursor-grabbing select-none"
        />

        {/* Hover Tooltip Overlay */}
        {hoveredNode && (
          <div className="absolute top-4 right-4 bg-[#ffffff] border-2 border-[#bc6c25] rounded-xl p-3 shadow-lg pointer-events-none text-right font-sans z-10">
            <div className="flex items-center gap-2 justify-end">
              <span className="text-xs font-bold text-[#8d6e63]">حرفِ منتخب:</span>
              <span className="font-amiri text-xl font-bold text-[#bc6c25]">{hoveredNode.letter}</span>
            </div>
            <div className="text-xs text-[#5d4037] mt-1 space-y-0.5 font-medium">
              <div>عنصر: <span className="font-bold">{hoveredNode.elementUrdu}</span></div>
              <div>عددِ ابجد: <span className="font-bold">{hoveredNode.kabir}</span></div>
              <div>سطر نمبر: <span className="font-bold">{hoveredNode.step}</span> (مقام {hoveredNode.index + 1})</div>
            </div>
          </div>
        )}

        {/* Legend Overlay at Bottom Left */}
        <div className="absolute bottom-4 left-4 bg-[#ffffff]/90 backdrop-blur-xs border border-[#e7d8c9] rounded-xl p-3 shadow-sm text-xs font-medium text-[#5d4037] space-y-1.5">
          <div className="font-bold text-[#bc6c25] flex items-center gap-1">
            <Info className="h-3.5 w-3.5" />
            <span>راہنمائے عناصر و حرکات:</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d90429]" /> آتشی
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#e76f51]" /> بادی
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1d3557]" /> آبی
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#283618]" /> خاکی
            </span>
          </div>
          <div className="text-[10px] text-[#8d6e63] border-t border-[#e7d8c9] pt-1">
            قاعدہ: دائیں جانب مؤخر اور بائیں جانب صدر کے حروف کا حسابی تمازج
          </div>
        </div>
      </div>
    </div>
  );
};
