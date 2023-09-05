package com.ecoclick.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class BodegaProductoId implements Serializable {
	private static final long serialVersionUID = 7463356152051442925L;

	@Column(name = "id_bodega")
    private int bodegaId;

    @Column(name = "id_producto")
    private int productoId;

}