import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosVentaComponent } from './productos-venta.component';

describe('ProductosVentaComponent', () => {
  let component: ProductosVentaComponent;
  let fixture: ComponentFixture<ProductosVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
