import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppComponent } from './app.component';
import { SimpleScannerComponent } from './simple-scanner/simple-scanner.component';
import { ResultDisplayComponent } from './result-display/result-display.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleScannerComponent,
    ResultDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
