package pe.edu.utp.proyecto.service.patron.observer;
import pe.edu.utp.proyecto.service.patron.singleton.BitacoraSingleton;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class SupervisorObserver {
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(SupervisorObserver.class);

    @EventListener
    public void manejarTicketApuesta(TicketApuestaEvent evento) {

        log.info("[NOTIFICACIÃ“N IMPORTANTE] Supervisor informado: {}", evento.getMensaje());
        BitacoraSingleton.getInstancia().registrar("Evento registrado: " + evento.getMensaje());
    }
}
