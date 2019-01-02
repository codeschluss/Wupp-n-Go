import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicModel } from 'src/realm/topic/topic.model';
import { PageModel } from 'src/realm/page/page.model';

@Component({
    selector: 'topic-view--component',
    templateUrl: 'topic.view.component.html'
})

export class TopicViewComponent implements OnInit {

  public static readonly imports = [];
  public topic: TopicModel;
  public pages: PageModel[];

  constructor(
      private route: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.topic = this.route.snapshot.data.topic;
  }

  public toPage(pageID: string) {
    this.router.navigate(['/view/page/' + pageID]);
  }

}