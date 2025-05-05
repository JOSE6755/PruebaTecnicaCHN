package com.CHN.PruebaCHN;
import com.CHN.PruebaCHN.models.dao.IClienteDAO;
import com.CHN.PruebaCHN.models.dto.ClienteDTO;
import com.CHN.PruebaCHN.models.entity.Cliente;
import com.CHN.PruebaCHN.models.entity.Prestamo;
import com.CHN.PruebaCHN.models.service.ClienteServiceIMPL;
import com.CHN.PruebaCHN.utils.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ClienteServiceIMPLTest {

    @Mock
    private IClienteDAO clienteDAO;

    @InjectMocks
    private ClienteServiceIMPL clienteService;

    private Cliente cliente;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        cliente = new Cliente();
        cliente.setId(1L);
        cliente.setNombre("Ana");
        cliente.setApellido("López");
        cliente.setDpi("1234567890123");
        cliente.setCorreoElectronico("ana.lopez@gmail.com");
        cliente.setFechaNac(new Date());
        cliente.setDireccion("Zona 1");
        cliente.setTelefono("12345678");
        cliente.setEliminado(0);
        cliente.setPrestamos(new ArrayList<>());
    }

    @Test
    public void testFindAll() {
        when(clienteDAO.findAll()).thenReturn(List.of(cliente));
        Response<List<ClienteDTO>> response = clienteService.findAll();

        assertTrue(response.isExito());
        assertEquals(1, response.getData().size());
        assertEquals("Ana", response.getData().get(0).getNombre());
    }

    @Test
    public void testSaveClienteExistente() {
        when(clienteDAO.findByDpiOrCorreoElectronico(cliente.getDpi(), cliente.getCorreoElectronico()))
                .thenReturn(Optional.of(cliente));

        Response<ClienteDTO> response = clienteService.save(cliente);
        assertFalse(response.isExito());
        assertEquals("El Cliente ya existe por el correo o dpi", response.getMsg());
    }

    @Test
    public void testSaveClienteNuevo() {
        when(clienteDAO.findByDpiOrCorreoElectronico(cliente.getDpi(), cliente.getCorreoElectronico()))
                .thenReturn(Optional.empty());
        when(clienteDAO.save(any())).thenReturn(cliente);

        Response<ClienteDTO> response = clienteService.save(cliente);
        assertTrue(response.isExito());
        assertEquals("Cliente creado con exito", response.getMsg());
    }

    @Test
    public void testUpdateClienteNoExistente() {
        when(clienteDAO.findById(1L)).thenReturn(Optional.empty());

        Response<ClienteDTO> response = clienteService.update(cliente, 1L);
        assertFalse(response.isExito());
        assertEquals("El Cliente no existe", response.getMsg());
    }

    @Test
    public void testUpdateClienteDpiOCorreoDuplicado() {
        Cliente otro = new Cliente();
        otro.setId(2L);
        otro.setDpi(cliente.getDpi());
        otro.setCorreoElectronico(cliente.getCorreoElectronico());

        when(clienteDAO.findById(1L)).thenReturn(Optional.of(cliente));
        when(clienteDAO.findByDpiOrCorreoElectronico(cliente.getDpi(), cliente.getCorreoElectronico()))
                .thenReturn(Optional.of(otro));

        Response<ClienteDTO> response = clienteService.update(cliente, 1L);
        assertFalse(response.isExito());
        assertEquals("El DPI o correo del cliente ya existe", response.getMsg());
    }

    @Test
    public void testDeleteCliente() {
        Prestamo prestamo = new Prestamo();
        cliente.setPrestamos(List.of(prestamo));

        when(clienteDAO.findById(1L)).thenReturn(Optional.of(cliente));
        when(clienteDAO.save(any())).thenReturn(cliente);

        Response<String> response = clienteService.delete(1L);
        assertTrue(response.isExito());
        assertEquals("Cliente eliminado con exito", response.getMsg());
        assertEquals(1, cliente.getEliminado());
        assertEquals(1, cliente.getPrestamos().get(0).getEliminado());
    }

    @Test
    public void testFindByIdClienteExiste() {
        when(clienteDAO.findById(1L)).thenReturn(Optional.of(cliente));

        Response<ClienteDTO> response = clienteService.findById(1L);
        assertTrue(response.isExito());
        assertEquals("Ana", response.getData().getNombre());
    }

    @Test
    public void testFindByIdClienteNoExiste() {
        when(clienteDAO.findById(1L)).thenReturn(Optional.empty());

        Response<ClienteDTO> response = clienteService.findById(1L);
        assertFalse(response.isExito());
        assertEquals("El Cliente no existe", response.getMsg());
    }
}