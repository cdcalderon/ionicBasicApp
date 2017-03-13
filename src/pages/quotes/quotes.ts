import { AlertController } from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";

import {Quote} from '../../data/quote.interface';
import {QuotesService} from "../../services/quotes";

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html'
})
export class QuotesPage implements OnInit{

  quoteGroup: { category: string, quotes: Quote[], icon: string};

  constructor(private navParams: NavParams,
              private alertCtrl: AlertController,
              private quotesService: QuotesService) {}

  // ionViewDidLoad() {
  //   this.quoteGroup = this.navParams.data;
  //   Add elvis operator (?) in templete to use this approach
  // }
  //

  ngOnInit(): void {
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavorite(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: "Add Quote",
      subTitle: "Are you sure?",
      message: "Are you sure you want to add the quote?",
      buttons: [
        {
          text: "Yes, go ahead",
          handler: () => {
            this.quotesService.addQuoteToFavorites(selectedQuote);
        }
      },
        {
          text: "no",
          role: "cancel",
          handler: () => {
            console.log("cancelled");
          }
        }
      ]
    });

    alert.present();
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quotesService.removeQuoteFromFavorites(quote);
  }

  isFavorite(quote: Quote) {
    return this.quotesService.isQuoteFavorite(quote);
  }

}
