package pe.edu.utp.proyecto.modelo;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.util.List;

@Document(collection = "partidos")
public class Partido {
    @Id
    private String id;
    private String equipo1;
    private String equipo2;
    private String fecha;
    private String deporte;
    private String ganador;
    private String estadio;

    private double cuotaEquipo1;
    private double cuotaEmpate;
    private double cuotaEquipo2;
    private Integer golesEquipo1;
    private Integer golesEquipo2;

    @DBRef
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Apuesta> apuestas;

    public Partido(String equipo1, String equipo2, String fecha, String deporte, String estadio) {
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.fecha = fecha;
        this.deporte = deporte;
        this.estadio = estadio;
        this.cuotaEquipo1 = 2.0;
        this.cuotaEmpate = 3.0;
        this.cuotaEquipo2 = 2.5;
    }

    public Partido(String equipo1, String equipo2, String fecha, String deporte, double cuotaEquipo1, double cuotaEmpate, double cuotaEquipo2, String estadio) {
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.fecha = fecha;
        this.deporte = deporte;
        this.cuotaEquipo1 = cuotaEquipo1;
        this.cuotaEmpate = cuotaEmpate;
        this.cuotaEquipo2 = cuotaEquipo2;
        this.estadio = estadio;
    }


    public String getId() { return this.id; }
    public void setId(String id) { this.id = id; }
    public String getEquipo1() { return this.equipo1; }
    public void setEquipo1(String equipo1) { this.equipo1 = equipo1; }
    public String getEquipo2() { return this.equipo2; }
    public void setEquipo2(String equipo2) { this.equipo2 = equipo2; }
    public String getFecha() { return this.fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }
    public String getDeporte() { return this.deporte; }
    public void setDeporte(String deporte) { this.deporte = deporte; }
    public String getGanador() { return this.ganador; }
    public void setGanador(String ganador) { this.ganador = ganador; }
    public String getEstadio() { return this.estadio; }
    public void setEstadio(String estadio) { this.estadio = estadio; }
    public double getCuotaEquipo1() { return this.cuotaEquipo1; }
    public void setCuotaEquipo1(double cuotaEquipo1) { this.cuotaEquipo1 = cuotaEquipo1; }
    public double getCuotaEmpate() { return this.cuotaEmpate; }
    public void setCuotaEmpate(double cuotaEmpate) { this.cuotaEmpate = cuotaEmpate; }
    public double getCuotaEquipo2() { return this.cuotaEquipo2; }
    public void setCuotaEquipo2(double cuotaEquipo2) { this.cuotaEquipo2 = cuotaEquipo2; }
    public Integer getGolesEquipo1() { return this.golesEquipo1; }
    public void setGolesEquipo1(Integer golesEquipo1) { this.golesEquipo1 = golesEquipo1; }
    public Integer getGolesEquipo2() { return this.golesEquipo2; }
    public void setGolesEquipo2(Integer golesEquipo2) { this.golesEquipo2 = golesEquipo2; }
    public List<Apuesta> getApuestas() { return this.apuestas; }
    public void setApuestas(List<Apuesta> apuestas) { this.apuestas = apuestas; }

    public Partido() {}

    public Partido(String id, String equipo1, String equipo2, String fecha, String deporte, String ganador, String estadio, double cuotaEquipo1, double cuotaEmpate, double cuotaEquipo2, Integer golesEquipo1, Integer golesEquipo2, List<Apuesta> apuestas) {
        this.id = id;
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.fecha = fecha;
        this.deporte = deporte;
        this.ganador = ganador;
        this.estadio = estadio;
        this.cuotaEquipo1 = cuotaEquipo1;
        this.cuotaEmpate = cuotaEmpate;
        this.cuotaEquipo2 = cuotaEquipo2;
        this.golesEquipo1 = golesEquipo1;
        this.golesEquipo2 = golesEquipo2;
        this.apuestas = apuestas;
    }
}
