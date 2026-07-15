package pe.edu.utp.proyecto.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.util.List;

@Document(collection = "plataformas")
public class Plataforma {

    @Id
    private String id;
    private String mensaje;
    private String codigo;
    
    @DBRef
    private Plataforma padre;
    
    @DBRef
    private List<Plataforma> subOpciones;

    public String getId() { return this.id; }
    public void setId(String id) { this.id = id; }
    public String getMensaje() { return this.mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
    public String getCodigo() { return this.codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }
    public Plataforma getPadre() { return this.padre; }
    public void setPadre(Plataforma padre) { this.padre = padre; }
    public List<Plataforma> getSubOpciones() { return this.subOpciones; }
    public void setSubOpciones(List<Plataforma> subOpciones) { this.subOpciones = subOpciones; }

    public Plataforma() {}

    public Plataforma(String id, String mensaje, String codigo, Plataforma padre, List<Plataforma> subOpciones) {
        this.id = id;
        this.mensaje = mensaje;
        this.codigo = codigo;
        this.padre = padre;
        this.subOpciones = subOpciones;
    }
}
