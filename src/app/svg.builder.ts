import { select, Selection } from 'd3';

export interface SVGElementReference {
  draw: () => SVGElementReference;
  getContent: () => Selection<SVGSVGElement, unknown, null, unknown>;
  updateDimensions: (
    newHeight: number,
    newWidth: number
  ) => SVGElementReference;
}
export interface SVGBuilder {
  id: string;
  container: HTMLElement;
  width: number;
  height: number;
}

export const buildSvg = (options: SVGBuilder): SVGElementReference => {
  let svgElement: any;
  const module = {
    draw() {
      if (options && options.container) {
        const svgId = `svg#${options.id}`;
        svgElement = select(options.container)
          .select<SVGSVGElement>(svgId)
          .node()
          ? select(svgId)
          : select(options.container).append('svg');

        svgElement
          .attr('id', options.id)
          .attr('height', options.height)
          .attr('width', options.width);
      }
      return module;
    },
    updateDimensions(newHeight: number, newWidth: number) {
      options.height = newHeight;
      options.width = newWidth;
      this.draw();
      return module;
    },
    getContent() {
      return svgElement;
    }
  };
  return module;
};
