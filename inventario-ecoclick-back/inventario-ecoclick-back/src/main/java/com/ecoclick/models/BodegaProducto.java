package com.ecoclick.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "bodega-producto")
@Data
public class BodegaProducto {

	@EmbeddedId
	private BodegaProductoId id;
	
	@Column(name = "stock")
	private int stock;
}
