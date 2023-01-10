import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() {}
  //get the postion of the m letter
  getPosition(string, target, index) {
    
    return string.split(target, index).join(target).length;
  }
//change the url to large
  getLargeImg(url: string, index) {
    return url.slice(0, index - 1) + url.slice(index - 1, index + 1).replace("m", 'l') + url.slice(index + 1, 59);
  }

  removeNoImage(arr) {
    let newArr = []
   
    arr.forEach((e) => {
      let garbageImg = "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png"
      if (e.coverPage != garbageImg) {
        e.coverPage = this.getLargeImg(e.coverPage, this.getPosition(e.coverPage, "m/", 2))
        newArr.push(e);
      }
    })

    return newArr;
  }
}
