import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-import-ambassadors',
  templateUrl: './import-ambassadors.page.html',
  styleUrls: ['./import-ambassadors.page.scss'],
})
export class ImportAmbassadorsPage implements OnInit {

  //Variables
  username
  filePath:string =""
  fileBase64:string =""
  
  constructor(private menu:MenuController, 
    private route:Router, 
    private popoverController:PopoverController,
    private alert:AlertController,
    private http:HttpClient) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    this.username = localStorage.getItem('UserName')
  }

 ReadFile(fileValue:any){
//Gets the actual file
var file: File = fileValue;
//Creates a reader that will read the file for information
var myReader: FileReader = new FileReader();

//Get the extension by splitting the name and popping the name off
this.filePath = file.name.split('.').pop();

//Once the reader has loaded, load the Base64 string of the file into the variable declared earlier
myReader.onloadend = (e) => {
  this.fileBase64 = myReader.result.toString().substr(myReader.result.toString().indexOf(',') + 1);
}
//Read the file in and parse it to Base64
myReader.readAsDataURL(file);

  }

  Import(event){
  console.log("Imported:",  event.target.files[0])
  this.ReadFile(event.target.files[0])
    console.log(this.fileBase64)
    // const file = event.target.files[0]
    // let csvData = event.target.files[0];
    // let options = {
    //     complete: (results, file) => {
    //         console.log('Parsed: ', results, file);
    //     }
    //     // Add your options here
    // };

    // this.papa.parse(csvData,options);
    // this.http.get(event.target.files[0]).subscribe(
    //   data=> console.log(data),
    //   err=> console.log(err)
    // )
  }
  Back(){
    this.route.navigate(['view-ambassadors'])
    console.log("Back to ambassaodr page")
  }
  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
  }

   // Show Profile optionss when icon on right of navbar clicked function
   async presentPopover(event)
   {
     const popover = await this.popoverController.create({
       component: ProfilePopoverComponent,
       event
     });
     return await popover.present();
   }
   Save(){
    console.log("Save data to database")
   }
}
