import { Component, OnInit, VERSION } from '@angular/core';
import { buildSvg, SVGElementReference } from './svg.builder';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  title = 'builder-demo';
  height = 350;
  width = 350;
  svg1Ref!: SVGElementReference;
  svg2Ref!: SVGElementReference;

  ngOnInit() {
    const svg1Container: HTMLElement = document.getElementById(
      'svg-container-1'
    ) as HTMLElement;

    const svg2Container: HTMLElement = document.getElementById(
      'svg-container-1'
    ) as HTMLElement;

    this.svg1Ref = buildSvg({
      id: 'firstBox',
      container: svg1Container,
      width: this.width,
      height: this.height
    });
    this.svg1Ref.draw();
    this.svg1Ref.getContent().style('background', '#9ACD32');

    this.svg2Ref = buildSvg({
      id: 'secondBox',
      container: svg2Container,
      width: 200,
      height: 200
    });

    setTimeout(() => {
      this.svg2Ref.draw();
      this.svg2Ref.getContent().style('background', '#800080');
    }, 2000);
  }

  resize() {
    const { randomHeight, randomWidth } = this.getRandomDimension();
    this.svg1Ref.updateDimensions(randomHeight, randomWidth);
    this.svg2Ref.updateDimensions(randomHeight, randomWidth);
  }

  resizeSvg1() {
    const { randomHeight, randomWidth } = this.getRandomDimension();
    this.svg1Ref.updateDimensions(randomHeight, randomWidth);
  }

  resizeSvg2() {
    const { randomHeight, randomWidth } = this.getRandomDimension();
    this.svg2Ref.updateDimensions(randomHeight, randomWidth);
  }

  private getRandomDimension() {
    const randomHeight = Math.floor(Math.random() * 250) + 100;
    const randomWidth = Math.floor(Math.random() * 250) + 100;
    return { randomHeight, randomWidth };
  }
}
