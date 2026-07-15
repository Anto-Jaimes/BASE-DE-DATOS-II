package pe.edu.utp.proyecto.modelo;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Document(collection = "apuestas")
public class Apuesta {

    @Id
    private String id;

    private String tipo;
    private LocalDateTime fecha;
    private String estado;

    private boolean huboTicketApuesta = false;
    private double monto;
    private String resultadoApostado;

    private double cuota = 1.0;

    private double ganancia = 0.0;
    private String codigoTicket;
    private Integer propTarjetasRojas;
    private Integer propTarjetasAmarillas;
    private String propExpulsado;

    private String apostadorNombreCompleto;
    private String apostadorApellido;
    private String apostadorDni;
    private String apostadorContrasena;
    private String equipo1;
    private String equipo2;

    @DBRef
    private Usuario usuario;

    @DBRef
    private Partido partido;

    @DBRef
    private Plataforma plataformaActual;

    public String getId() { return this.id; }
    public void setId(String id) { this.id = id; }
    public String getTipo() { return this.tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public LocalDateTime getFecha() { return this.fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
    public String getEstado() { return this.estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public boolean getHuboTicketApuesta() { return this.huboTicketApuesta; }
    public void setHuboTicketApuesta(boolean huboTicketApuesta) { this.huboTicketApuesta = huboTicketApuesta; }
    public double getMonto() { return this.monto; }
    public void setMonto(double monto) { this.monto = monto; }
    public String getResultadoApostado() { return this.resultadoApostado; }
    public void setResultadoApostado(String resultadoApostado) { this.resultadoApostado = resultadoApostado; }
    public double getCuota() { return this.cuota; }
    public void setCuota(double cuota) { this.cuota = cuota; }
    public double getGanancia() { return this.ganancia; }
    public void setGanancia(double ganancia) { this.ganancia = ganancia; }
    public String getCodigoTicket() { return this.codigoTicket; }
    public void setCodigoTicket(String codigoTicket) { this.codigoTicket = codigoTicket; }
    public Integer getPropTarjetasRojas() { return this.propTarjetasRojas; }
    public void setPropTarjetasRojas(Integer propTarjetasRojas) { this.propTarjetasRojas = propTarjetasRojas; }
    public Integer getPropTarjetasAmarillas() { return this.propTarjetasAmarillas; }
    public void setPropTarjetasAmarillas(Integer propTarjetasAmarillas) { this.propTarjetasAmarillas = propTarjetasAmarillas; }
    public String getPropExpulsado() { return this.propExpulsado; }
    public void setPropExpulsado(String propExpulsado) { this.propExpulsado = propExpulsado; }
    public String getApostadorNombreCompleto() { return this.apostadorNombreCompleto; }
    public void setApostadorNombreCompleto(String apostadorNombreCompleto) { this.apostadorNombreCompleto = apostadorNombreCompleto; }
    public String getApostadorApellido() { return this.apostadorApellido; }
    public void setApostadorApellido(String apostadorApellido) { this.apostadorApellido = apostadorApellido; }
    public String getApostadorDni() { return this.apostadorDni; }
    public void setApostadorDni(String apostadorDni) { this.apostadorDni = apostadorDni; }
    public String getApostadorContrasena() { return this.apostadorContrasena; }
    public void setApostadorContrasena(String apostadorContrasena) { this.apostadorContrasena = apostadorContrasena; }
    public String getEquipo1() { return this.equipo1; }
    public void setEquipo1(String equipo1) { this.equipo1 = equipo1; }
    public String getEquipo2() { return this.equipo2; }
    public void setEquipo2(String equipo2) { this.equipo2 = equipo2; }
    public Usuario getUsuario() { return this.usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public Partido getPartido() { return this.partido; }
    public void setPartido(Partido partido) { this.partido = partido; }
    public Plataforma getPlataformaActual() { return this.plataformaActual; }
    public void setPlataformaActual(Plataforma plataformaActual) { this.plataformaActual = plataformaActual; }

    public Apuesta() {}

    public Apuesta(String id, String tipo, LocalDateTime fecha, String estado, boolean huboTicketApuesta, double monto, String resultadoApostado, double cuota, double ganancia, String codigoTicket, Integer propTarjetasRojas, Integer propTarjetasAmarillas, String propExpulsado, String apostadorNombreCompleto, String apostadorApellido, String apostadorDni, String apostadorContrasena, String equipo1, String equipo2, Usuario usuario, Partido partido, Plataforma plataformaActual) {
        this.id = id;
        this.tipo = tipo;
        this.fecha = fecha;
        this.estado = estado;
        this.huboTicketApuesta = huboTicketApuesta;
        this.monto = monto;
        this.resultadoApostado = resultadoApostado;
        this.cuota = cuota;
        this.ganancia = ganancia;
        this.codigoTicket = codigoTicket;
        this.propTarjetasRojas = propTarjetasRojas;
        this.propTarjetasAmarillas = propTarjetasAmarillas;
        this.propExpulsado = propExpulsado;
        this.apostadorNombreCompleto = apostadorNombreCompleto;
        this.apostadorApellido = apostadorApellido;
        this.apostadorDni = apostadorDni;
        this.apostadorContrasena = apostadorContrasena;
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.usuario = usuario;
        this.partido = partido;
        this.plataformaActual = plataformaActual;
    }
}
