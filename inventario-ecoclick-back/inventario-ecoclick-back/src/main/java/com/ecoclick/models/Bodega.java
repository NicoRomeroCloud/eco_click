package com.ecoclick.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "bodega")
@Data
public class Bodega {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id_bodega")
	private int id_bodega;

	@Column(name = "ubicacion")
	private String ubicacion;

	@Column(name = "calle")
	private String calle;

	@Column(name = "numero")
	private int numero;

	@Column(name = "comuna")
	private String comuna;

	@Column(name = "descripcion")
	private String descripcion;

	//Relaciones
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "bodega-producto", joinColumns = @JoinColumn(name = "id_bodega"), 
			   inverseJoinColumns = @JoinColumn(name = "id_producto"))
	@JsonIdentityInfo(
    		generator = ObjectIdGenerators.PropertyGenerator.class,
    		property = "id_producto")
    @JsonIdentityReference(alwaysAsId = true)
	private List<Producto> productos;

	//Metodo Relacion
	public void addProducto(Producto producto) {
        getProductos().add(producto);
        producto.addBodega(this);
    }

	

	
    
}