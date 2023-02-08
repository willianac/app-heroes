import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";

import { Hero } from "./hero";
import { MessageService } from "./message-service";

@Injectable({
    providedIn: "root"
})
export class HeroService {

    private heroesUrl:string = "http://localhost:3000/heroes"
    httpOptions = {
        headers: new HttpHeaders({"Content-Type" : "application/json"})
    }

    constructor(private messageService: MessageService, private http: HttpClient) {}

    public getHeroes():Observable<Hero[]> {
        const heroes = this.http.get<Hero[]>(this.heroesUrl)

        return heroes.pipe(
            tap(_ => this.log("success", "Success", "Fetched heroes successfully")),
            catchError(this.handleError<Hero[]>('getHeroes', []))
        )
    }

    public getHero(id: number): Observable<Hero> {
        const hero = this.http.get<Hero>(this.heroesUrl + `/${id}`)
        return hero.pipe(
            tap(_ => this.log("success", "Success", `Fetched hero ID ${id}`)),
            catchError(this.handleError<Hero>(`getHero id ${id}`)) 
        )
    }

    public updateHero(hero: Hero): Observable<any> {
        return this.http.put<Hero>(this.heroesUrl + `/${hero.id}`, hero, this.httpOptions).pipe(
            tap(_ => this.log("success", "Success", `Updated hero with id ${hero.id}`)),
            catchError(this.handleError<any>("updateHero"))
        )
    }

    public addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
            tap((newHero: Hero) => this.log("success", "Success", `${hero.name} added successfully`)),
            catchError(this.handleError<Hero>("addHero"))
        )
    }

    public deleteHero(id: number): Observable<Hero> {
        const heroToDelete = this.heroesUrl + "/" + id;
        return this.http.delete<Hero>(heroToDelete, this.httpOptions).pipe(
            tap(_ => this.log("info", "Deleted", "Deleted hero ID: " + id)),
            catchError(this.handleError<Hero>("deleteHero"))
        )
    }

    public searchHeroes(term: string): Observable<Hero[]> {
        if(!term.trim()) {return of ([])}
        return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
            tap(x => x.length ? 
                this.log("success", "Found", `Found heroes matching term ${term}`) : 
                this.log("error", "Not found", `No heroes matching term ${term}`)),
            catchError(this.handleError<Hero[]>("searchHeroes", []))
        )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return(error: any): Observable<T> => {
            this.log("error", "Error", `failed: ${error.message}`)
            return of (result as T)
        } 
    }

    private log(severity: string, title: string, message: string) {
        this.messageService.add({severity: severity, summary: title, detail: message})
    }
}