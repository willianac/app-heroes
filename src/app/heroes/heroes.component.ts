import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes = HEROES
  selectedHero?: Hero;

  onSelect(hero: Hero) {
    this.selectedHero = hero
  }
}
