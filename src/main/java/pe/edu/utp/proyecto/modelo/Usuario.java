package pe.edu.utp.proyecto.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.index.Indexed;
import java.util.List;

@Document(collection = "usuarios")
public class Usuario {

    @Id
    private String id;

    private String nombre;
    private String apellido;
    private String dni;
    
    @Indexed(unique = true)
    private String codigo;

    private int totalTicketApuestas = 0;
    private String email;
    private String contrasena;

    private double saldo = 0.0;
    private String rol;
    
    private String tipoDocumento;
    private String fechaNacimiento;
    private String genero;
    private String direccion;
    private String departamento;
    private String provincia;
    private String distrito;
    private String telefono;

    @DBRef
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Apuesta> apuestas;

    public String getId() { return this.id; }
    public void setId(String id) { this.id = id; }
    public String getNombre() { return this.nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getApellido() { return this.apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }
    public String getDni() { return this.dni; }
    public void setDni(String dni) { this.dni = dni; }
    public String getCodigo() { return this.codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }
    public int getTotalTicketApuestas() { return this.totalTicketApuestas; }
    public void setTotalTicketApuestas(int totalTicketApuestas) { this.totalTicketApuestas = totalTicketApuestas; }
    public String getEmail() { return this.email; }
    public void setEmail(String email) { this.email = email; }
    public String getContrasena() { return this.contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }
    public double getSaldo() { return this.saldo; }
    public void setSaldo(double saldo) { this.saldo = saldo; }
    public String getRol() { return this.rol; }
    public void setRol(String rol) { this.rol = rol; }
    public String getTipoDocumento() { return this.tipoDocumento; }
    public void setTipoDocumento(String tipoDocumento) { this.tipoDocumento = tipoDocumento; }
    public String getFechaNacimiento() { return this.fechaNacimiento; }
    public void setFechaNacimiento(String fechaNacimiento) { this.fechaNacimiento = fechaNacimiento; }
    public String getGenero() { return this.genero; }
    public void setGenero(String genero) { this.genero = genero; }
    public String getDireccion() { return this.direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public String getDepartamento() { return this.departamento; }
    public void setDepartamento(String departamento) { this.departamento = departamento; }
    public String getProvincia() { return this.provincia; }
    public void setProvincia(String provincia) { this.provincia = provincia; }
    public String getDistrito() { return this.distrito; }
    public void setDistrito(String distrito) { this.distrito = distrito; }
    public String getTelefono() { return this.telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public List<Apuesta> getApuestas() { return this.apuestas; }
    public void setApuestas(List<Apuesta> apuestas) { this.apuestas = apuestas; }

    public Usuario() {}

    public Usuario(String id, String nombre, String apellido, String dni, String codigo, int totalTicketApuestas, String email, String contrasena, double saldo, String rol, String tipoDocumento, String fechaNacimiento, String genero, String direccion, String departamento, String provincia, String distrito, String telefono, List<Apuesta> apuestas) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.codigo = codigo;
        this.totalTicketApuestas = totalTicketApuestas;
        this.email = email;
        this.contrasena = contrasena;
        this.saldo = saldo;
        this.rol = rol;
        this.tipoDocumento = tipoDocumento;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.direccion = direccion;
        this.departamento = departamento;
        this.provincia = provincia;
        this.distrito = distrito;
        this.telefono = telefono;
        this.apuestas = apuestas;
    }
}
