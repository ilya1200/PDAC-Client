import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  
  constructor(private fb: FormBuilder, 
    private cd: ChangeDetectorRef,
    private http:HttpService) {}

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  
  ngOnInit() {
  }

  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
       });
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  uploadImage():void{
    this.http.uploadImage(this.formGroup.value.file);
  }
}
