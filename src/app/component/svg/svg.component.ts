import { Component, OnInit, ElementRef, Input, Renderer2 } from '@angular/core';
import { SvgService } from '../../service/svg.service';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent implements OnInit {

  @Input("src")
  svgName: string;

  @Input("label")
  label?: string;  

  @Input("classes")
  classes?: string[] = [];

  constructor(private element: ElementRef, private renderer: Renderer2, private svgService: SvgService) { }

  ngOnInit() {
    this.svgService.getSvgByName(this.svgName).subscribe(newNode => {
      this.element.nativeElement.innerHTML = newNode;
      this.renderer.setAttribute(this.element.nativeElement, "aria-label", this.label || this.element.nativeElement.title);
      this.renderer.addClass(this.element.nativeElement, 'svg');
      this.classes.forEach(c =>  this.renderer.addClass(this.element.nativeElement, c));
    });
  }

}