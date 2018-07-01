import { TopicService } from './topic-component/topic.service';
import { TopicComponent } from './topic-component/topic.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,TopicComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TopicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
