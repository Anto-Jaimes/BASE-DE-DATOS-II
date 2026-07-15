package pe.edu.utp.proyecto.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Document(collection = "tickets_apuesta")
public class TicketApuesta {

    @Id
    private String id;
    private String tipoServicio;
    private double monto;

    @DBRef
    private Apuesta apuesta;

    public String getId() { return this.id; }
    public void setId(String id) { this.id = id; }
    public String getTipoServicio() { return this.tipoServicio; }
    public void setTipoServicio(String tipoServicio) { this.tipoServicio = tipoServicio; }
    public double getMonto() { return this.monto; }
    public void setMonto(double monto) { this.monto = monto; }
    public Apuesta getApuesta() { return this.apuesta; }
    public void setApuesta(Apuesta apuesta) { this.apuesta = apuesta; }

    public TicketApuesta() {}

    public TicketApuesta(String id, String tipoServicio, double monto, Apuesta apuesta) {
        this.id = id;
        this.tipoServicio = tipoServicio;
        this.monto = monto;
        this.apuesta = apuesta;
    }
}
