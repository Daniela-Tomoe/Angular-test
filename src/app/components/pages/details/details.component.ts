import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  businessId!: number
  businessDetails!: any
  businessForm!: FormGroup
  addressForm!: FormGroup

  constructor (
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.businessId = Number(this.route.snapshot.paramMap.get('id'))
    
    this.detailsService.getItem(this.businessId).subscribe(data => {
      this.businessDetails = data
      this.createForm()
      this.createAdressForm()
      this.consultCep()
    })
  }

  createForm(): void {
    this.businessForm = this.formBuilder.group({
      name: [this.businessDetails.name, Validators.required],
      business: [this.businessDetails.business, Validators.required],
      valuation: [this.businessDetails.valuation, Validators.required],
      cnpj: [this.businessDetails.cnpj, Validators.required],
      active: [this.businessDetails.active, Validators.required]
    })
  }

  createAdressForm(): void {
    this.addressForm = this.formBuilder.group ({
      cep: [this.businessDetails.cep, Validators.required],
      street: [''],
      neighborhood: [''],
      city: [''],
      state: ['']
    })
  }

  consultCep(): void {
    const cep = this.addressForm.controls['cep'].value
    if (cep) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data) => {
        this.addressForm.patchValue({
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf
        })
      })
    }
  }

  goBack(): void {
    this.location.back();
  }

  saveChanges(): void {
    const businessData = this.businessForm.value;
    const addressData = this.addressForm.value;
    const data = {...businessData, ...addressData}

    this.detailsService.updateItem(this.businessId, data).subscribe(() => {
      console.log('Dados salvos com sucesso');
      this.goBack();
    }, error => {
      console.error(error);
      alert('Erro ao salvar os dados');
    });
  }
}
