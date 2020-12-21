import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  subscription = new Subscription();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log('params', this.route.params);
    this.subscription.add(this.route.params.subscribe(params => console.log('params', params)));
  }

}
