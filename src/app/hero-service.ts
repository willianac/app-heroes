import { Injectable } from "@angular/core";
import { HEROES } from "./mock-hero";
import { Observable, of } from "rxjs";
import { Hero } from "./hero";
import { MessageService } from "./message-service";

@Injectable({
    providedIn: "root"
})
export class HeroService {
    constructor(private messageService: MessageService) {}

    getHeroes():Observable<Hero[]> {
        const heroes = of (HEROES)
        this.messageService.add('Fetched Heroes succesfully!')
        return heroes
    }

    getHero(id: number): Observable<Hero> {
        const hero = HEROES.find(element => element.id === id)!
        this.messageService.add(`HeroService: fetched hero id=${id}`)
        return of (hero)
    }
}