package pe.edu.utp.proyecto.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Document(collection = "reglas_bono")
public class ReglaBono {

    @Id
    private String id;
    private double porcentaje;
    private double totalReglaBono;

    @DBRef
    private Usuario usuario;

    public String getId() { return this.id; }
    public void setId(String id) { this.id = id; }
    public double getPorcentaje() { return this.porcentaje; }
    public void setPorcentaje(double porcentaje) { this.porcentaje = porcentaje; }
    public double getTotalReglaBono() { return this.totalReglaBono; }
    public void setTotalReglaBono(double totalReglaBono) { this.totalReglaBono = totalReglaBono; }
    public Usuario getUsuario() { return this.usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public ReglaBono() {}

    public ReglaBono(String id, double porcentaje, double totalReglaBono, Usuario usuario) {
        this.id = id;
        this.porcentaje = porcentaje;
        this.totalReglaBono = totalReglaBono;
        this.usuario = usuario;
    }
}
