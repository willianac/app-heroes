import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero-service';
import { MessageService } from '../message-service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = []

  constructor(private heroService: HeroService) { }

  setHeroes() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

  add(name: string) {
    name = name.trim()
    if(!name) {return}
    this.heroService.addHero( {name} as Hero )
      .subscribe(heroToAdd => this.heroes.push(heroToAdd))
  }

  delete(hero: Hero) {
    this.heroService.deleteHero(hero.id).subscribe()
    this.heroes.filter(h => h !== hero)
  }

  ngOnInit() {
    this.setHeroes()
  }
}
