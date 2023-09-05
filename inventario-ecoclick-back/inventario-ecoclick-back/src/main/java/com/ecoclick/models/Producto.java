 package com.ecoclick.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import com.ecoclick.models.Producto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "producto")
@Getter
@Setter
public class Producto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id_producto")
	private int id_producto;

	@Column(name = "codigo_sku")
	private String sku;

	@Column(name = "nombre_producto")
	private String nombre;
	
	@Column(name = "descripcion_producto")
	private String descripcion;

    @Column(name = "precio_costo")
	private int precio_costo;

	@Column(name = "precio_lista")
	private int precio_lista;

    @Column(name = "unidades")
	private int unidades;

	//Relaciones
	@ManyToMany(cascade = CascadeType.ALL, mappedBy = "productos")
	@JsonIgnoreProperties("productos")
	private List<Bodega> bodegas;

	@ManyToOne(optional=true, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria")
	@JsonIgnoreProperties("productos")
	private Categoria categoria;
	
	//Metodo Relacion
	public void addBodega(Bodega bodega) {
        getBodegas().add(bodega);
    }


}