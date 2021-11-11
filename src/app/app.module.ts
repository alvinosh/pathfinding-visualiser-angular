import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { NodeComponent } from './components/node/node.component';
import { NodeListComponent } from './components/node-list/node-list.component';
import { ButtonComponent } from './components/button/button.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';

@NgModule({
  declarations: [AppComponent, GridComponent, NodeComponent, NodeListComponent, ButtonComponent, ToolBarComponent],
  imports: [BrowserModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
