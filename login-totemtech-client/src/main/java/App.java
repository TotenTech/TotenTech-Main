import com.github.britooo.looca.api.core.Looca;
import controller.*;
import dao.MemoriaDAO;
import entities.*;
import entities.register.CpuRegistro;
import entities.register.DiscoRegistro;
import entities.register.MemoriaRegistro;
import fr.bmartel.speedtest.SpeedTestReport;
import fr.bmartel.speedtest.SpeedTestSocket;
import fr.bmartel.speedtest.inter.ISpeedTestListener;
import fr.bmartel.speedtest.model.SpeedTestError;
import fr.bmartel.speedtest.utils.SpeedTestUtils;
import service.Convertions;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class App {

    static Totem logged = null;
    static Interrupcoes interrupcoes = null;
    static Cpu cpu = null;
    static Memoria memoria = null;
    static List<Disco> discos = null;
    static int system;
    static Looca looca = new Looca();

    public static void main(String[] args) throws Exception {

        inicio();

        if (logged != null) {
//            System.out.println(logged);
            try {
                cpu = CpuController.getCpu(logged.getIdTotem());
                if (!(cpu != null)) {
                    cpu = new Cpu("Ghz", (CpuController.getFrequenciaProcessador()), 1);
                    CpuController.insertCpu(cpu, logged.getIdTotem());
                    cpu = CpuController.getCpu(logged.getIdTotem());
                }

                memoria = MemoriaController.getMemoria(logged.getIdTotem());
                if (!(memoria != null)) {
                    memoria = new Memoria(MemoriaController.getTotal(), "Gb", 1);
                    MemoriaDAO.insertMemoria(memoria, logged.getIdTotem());
                }

                discos = DiscoController.getDiscos(logged.getIdTotem());
                if (!(discos != null)) {
                    List<com.github.britooo.looca.api.group.discos.Disco> d = DiscoController.getDiscosLooca();
                    for (int i = 0; i < d.size(); i++) {
                        Disco di = new Disco(looca.getGrupoDeDiscos().getDiscos().get(i).getModelo(), Convertions.toDoubleTwoDecimals(Convertions.bytesParaGb(looca.getGrupoDeDiscos().getDiscos().get(i).getTamanho().doubleValue())), "Gb", logged.getIdTotem());
                        discos.add(di);
                        DiscoController.insertDisco(di);
                    }
                }
//                System.out.println(discos);
//                System.out.println(cpu.toString());
//                System.out.println(memoria.toString());
            } catch (Exception e) {
                System.out.println("Um erro ocorreu no processo de login, tente novamente mais tarde");
            }

            while (true) {
                inserts();
                Thread.sleep(120000);
            }
        }

//            Teste reiniciar
//        if (logged) {
//            verificarSo();
//            if (system == 1) {
//                PowerShell prompt = new PowerShell();
//                prompt.restart();
//            } else {
//                TerminalLinux prompt = new TerminalLinux();
//            }
//        }
    }

    public static void inicio() throws Exception {
        Scanner input = new Scanner(System.in);

        int opcao;
        do {
            System.out.println("""
                Bem vindo(a)!
                Digite o número equivalente para escolher uma opção
                1-Entrar || 2-Sair""");

            opcao = input.nextInt();

            switch (opcao) {
                case 1 -> entrar();
                case 2 -> System.exit(0);
                default -> {
                    System.out.println("Escolha uma opção válida!");
                }
            }
        } while (opcao != 1 && opcao != 2);
        input.close();
    }


    public static void entrar() throws Exception {
        Scanner input = new Scanner(System.in);

        System.out.print("Digite seu login: ");
        String inputEmail = input.nextLine();

        System.out.print("Digite sua senha: ");
        String inputSenha = input.nextLine();

        Totem totemLog = TotemController.login(inputEmail, inputSenha);
        if (totemLog != null) {
            System.out.println("Login realizado com sucesso");
            logged = totemLog;
        } else {
            int opcao;
            do {
                System.out.println("""
                    Usuário não encontrado!
                    Digite o número equivalente para escolher uma opção
                    1-Tentar novamente || 2-Sair""");

                opcao = input.nextInt();

                switch (opcao) {
                    case 1 -> entrar();
                    case 2 -> System.exit(0);
                }
            } while (opcao != 1 && opcao != 2);
        }
        input.close();
    }

    public static void verificarSo() {
        String so = System.getProperty("os.name").toLowerCase();

        if (so.contains("win")) {
            system = 1;
        } else {
            system = 2;
        }
    }

    public static void inserts() {
        MemoriaRegistro memoriaRegistro = new MemoriaRegistro();
        memoriaRegistro.setTotem(logged.getIdTotem());
        memoriaRegistro.setMemoria(memoria.getIdmemoria());

        List<DiscoRegistro> discosRegistro = new ArrayList<>();
        for (int i = 0; i < discos.size(); i++) {
            discosRegistro.add(new DiscoRegistro());
            discosRegistro.get(i).setDisco(discos.get(i).getIddisco());
            discosRegistro.get(i).setTotem(logged.getIdTotem());
        }

        memoriaRegistro.setValor(MemoriaController.getUsingPercentage(memoria.getTotal()));
        System.out.println("Memoria RAM sendo utilizada em porcentagem: " + memoriaRegistro.getValor());
        MemoriaController.insertMemoriaRegistro(memoriaRegistro);

        for (int i = 0; i < discosRegistro.size(); i++) {
            discosRegistro.get(i).setValor(DiscoController.getUtilizadoPercentage(discos.get(i).getTotal(), i));
            System.out.println("Disco " + i+1 + " espaço utilizado em porcentagem: " + discosRegistro.get(i).getValor());
            DiscoController.insertDiscoRegistro(discosRegistro.get(i));
        }

        CpuRegistro cpuRegistro = new CpuRegistro();
        cpuRegistro.setCpu(cpu.getIdCpu());

        cpuRegistro.setTotem(logged.getIdTotem());

        cpuRegistro.setUtilizacao(CpuController.getUsingPercentage());
        System.out.println("Cpu sendo utilizada em porcentagem: " + cpuRegistro.getUtilizacao());

        cpuRegistro.setProcessos(CpuController.getProcessos());
        System.out.println("Total de processos: " + cpuRegistro.getProcessos());

        CpuController.insertCpuRegistro(cpuRegistro);


        Rede rede = new Rede();
        rede.setTotem(logged.getIdTotem());
        SpeedTestSocket speedTestSocket = new SpeedTestSocket();
        speedTestSocket.addSpeedTestListener(new ISpeedTestListener() {

            @Override
            public void onCompletion(SpeedTestReport report) {
                System.out.println("Velocidade da rede em mb/s: " + Convertions.toDoubleTwoDecimals(report.getTransferRateBit().divide(new BigDecimal(1000000)).doubleValue()));
                rede.setDownload(Convertions.toDoubleTwoDecimals(report.getTransferRateBit().divide(new BigDecimal(1000000)).doubleValue()));
                RedeController.insertRede(rede);
            }

            @Override
            public void onError(SpeedTestError speedTestError, String errorMessage) {
                System.out.println("Totem sem conexão de rede");
                rede.setDownload(null);
                RedeController.insertRede(rede);
            }

            @Override
            public void onProgress(float percent, SpeedTestReport report) {
//                System.out.println("Progresso teste de internet : " + percent + "%");
            }
        });
        speedTestSocket.startDownload("https://fsn1-speed.hetzner.com/100MB.bin");
    }
}
