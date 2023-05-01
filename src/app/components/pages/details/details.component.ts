import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  businessId!: number
  businessDetails!: any
  detailsForm!: FormGroup

  constructor (
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.businessId = Number(this.route.snapshot.paramMap.get('id'))
    
    this.detailsService.getItem(this.businessId).subscribe(data => {
      this.businessDetails = data
      this.createForm()
    })
  }

  createForm(): void {
    this.detailsForm = this.formBuilder.group({
      cep: [this.businessDetails.cep, Validators.required],
      name: [this.businessDetails.name, Validators.required],
      business: [this.businessDetails.business, Validators.required],
      valuation: [this.businessDetails.valuation, Validators.required],
      cnpj: [this.businessDetails.cnpj, Validators.required],
      active: [this.businessDetails.active, Validators.required]
    })
  }

}
