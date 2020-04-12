import { HeavyResource } from "./Resources"

export class BlobBasedHeavyResource implements HeavyResource{
    url: string
    preload() {
       fetch(this.url,{
           method:"GET",
           
       })
    }
    isLoaded: boolean
    value: string
    
}