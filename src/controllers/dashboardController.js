var dashboardModel = require("../models/dashboardModel");


function cadastrarTotem(req, res) {
    var nome = req.body.nomeServer;
    var login = req.body.loginServer;
    var senha = req.body.senhaServer;
    var empresa = req.body.empresaServer;
    var sistemaOperacional = req.body.sistemaOperacionalServer;

    if (nome == undefined ||
        login == undefined ||
        senha == undefined ||
        empresa == undefined ||
        sistemaOperacional == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.cadastrarTotem(nome, login, senha, sistemaOperacional, empresa)
            .then(function (resposta) {
                res.status(200).send("Totem cadastrado com sucesso");
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function cadastrarTotemComponetes(req, res) {
    var cpu = req.body.cpuServer;
    var rede = req.body.redeServer;
    var ram = req.body.ramServer;
    var disco = req.body.discoServer

    if (cpu == undefined ||
        rede == undefined ||
        ram == undefined ||
        disco == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.cadastrarTotemComponetes(cpu, rede, ram, disco)
            .then(function (resposta) {
                res.status(200).send("Componentes do totem cadastrado com sucesso");
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function cadastrarComponentesTotem(req, res) {
    var nomeComponente = req.body.nomeComponenteServer;
    var nome1 = req.body.nome1Server;
    var valor1 = req.body.valor1Server;
    var unidadeMedida1 = req.body.unidadeMedida1Server;
    var nome2 = req.body.nome2Server;
    var valor2 = req.body.valor2Server;
    var unidadeMedida2 = req.body.unidadeMedida2Server;
    var nomeComponenteCPU = req.body.nomeComponenteCPUServer;
    var valorCPU = req.body.valorCPUServer;
    var unidadeMedidaCPU = req.body.unidadeMedidaCPUServer;
    var nomeComponenteRede = req.body.nomeComponenteRedeServer;
    var nomeEspecificacao1Rede = req.body.nomeEspecificacao1RedeServer;
    var valorEspecificacao1Rede = req.body.valorEspecificacao1RedeServer;
    var unidadeMedidaEspecificacao1Rede = req.body.unidadeMedidaEspecificacao1RedeServer;
    var nomeEspecificacao2Rede = req.body.nomeEspecificacao2RedeServer;
    var valorEspecificacao2Rede = req.body.valorEspecificacao2RedeServer;
    var unidadeMedidaEspecificacao2Rede = req.body.unidadeMedidaEspecificacao2RedeServer;

    if (nomeComponente == undefined ||
        nome1 == undefined ||
        valor1 == undefined ||
        unidadeMedida1 == undefined ||
        nome2 == undefined ||
        valor2 == undefined ||
        unidadeMedida2 == undefined ) {

        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.cadastrarComponentesTotem( nomeComponente, nome1, valor1, unidadeMedida1, nome2, valor2, unidadeMedida2, nomeComponenteCPU, valorCPU, unidadeMedidaCPU, nomeComponenteRede,  nomeEspecificacao1Rede, valorEspecificacao1Rede, unidadeMedidaEspecificacao1Rede, nomeEspecificacao2Rede, valorEspecificacao2Rede, unidadeMedidaEspecificacao2Rede)
            .then(function (resposta) {
                res.status(200).send("Componentes do totem cadastrado com sucesso");
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function cadastrarComponentesTotemDisco(req, res) {
    var nomeComponente = req.body.nomeComponenteServer;
    var nome1 = req.body.nome1Server;
    var valor1 = req.body.valor1Server;
    var unidadeMedida1 = req.body.unidadeMedida1Server;
    var nome2 = req.body.nome2Server;
    var valor2 = req.body.valor2Server;
    var unidadeMedida2 = req.body.unidadeMedida2Server;

    if (
        nomeComponente == undefined ||
        nome1 == undefined ||
        valor1 == undefined ||
        unidadeMedida1 == undefined) {

        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.cadastrarComponentesTotemDisco( nomeComponente, nome1, valor1, unidadeMedida1, nome2, valor2, unidadeMedida2)
            .then(function (resposta) {
                res.status(200).send("Componentes do totem cadastrado com sucesso");
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function listarTotens(req, res) {
    var empresa = req.body.empresaServer

    dashboardModel.listarTotens(empresa).then(function (resposta) {
        res.status(200).send(resposta);

    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}

function deletarTotem(req, res) {
    var totem = req.body.totemServer;

    if (totem == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.deletarTotem(totem)
            .then(function (resposta) {
                res.status(200).send("Sucesso em deletar o totem");

            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function alterarTotem(req, res) {
    var nome = req.body.nomeServer;
    var login = req.body.loginServer;
    var senha = req.body.senhaServer;
    var sistemaOperacional = req.body.sistemaOperacionalServer;
    var totem = req.body.totemServer;

    if (nome == undefined ||
        login == undefined ||
        senha == undefined ||
        sistemaOperacional == undefined ||
        totem == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.alterarTotem(nome, login, senha, sistemaOperacional, totem)
            .then(function (resposta) {
                res.status(200).send("Alteração feita com sucesso!");

            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function alterarTotemComponente(req, res) {
    var cpu = req.body.cpuServer;
    var rede = req.body.redeServer;
    var memoria = req.body.ramServer;
    var disco = req.body.discoServer;
    var totem = req.body.totemServer;

    if (cpu == undefined ||
        rede == undefined ||
        memoria == undefined ||
        disco == undefined ||
        totem == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.alterarTotemComponente(cpu, rede, memoria, disco, totem)
            .then(function (resposta) {
                res.status(200).send("Alteração feita com sucesso!");

            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function alterarTotemRam(req, res) {
    var ram = req.body.ramServer;
    var totem = req.body.totemServer;

    if (ram == undefined ||
        totem == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.alterarTotemRam(ram, totem)
            .then(function (resposta) {
                res.status(200).send("Alteração feita com sucesso!");

            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function alterarComponenteEspecificacao(req, res) {
    var idcomponente = req.body.idcomponenteServer;
    var tipoComponente = req.body.tipoComponenteServer;
    var idespecificacao = req.body.idespecificacaoServer;
    var valorEspecificacao = req.body.valorEspecificacaoServer;

    if (valorEspecificacao == undefined ||
        tipoComponente == undefined ||
        idespecificacao == undefined ||
        idcomponente == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
            dashboardModel.alterarComponenteEspecificacao(idcomponente, tipoComponente, idespecificacao, valorEspecificacao)
                .then(function (resposta) {
                    res.status(200).send("Alteração feita com sucesso!");

                }).catch(function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                })
    }
}

function buscarInfoTotem(req, res) {
    var totem = req.body.totemServer;
    if (totem == undefined) {
        res.status(400).send("Seu totem está undefined!");
    } else {

        dashboardModel.buscarInfoTotem(totem)
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            nome: resultadoAutenticar[0].nome,
                            login: resultadoAutenticar[0].login,
                            senha: resultadoAutenticar[0].senha,
                            sistemaOperacional: resultadoAutenticar[0].sistemaOperacional,
                        });
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar buscar! Erro:", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function buscarInfoTotemComponente(req, res) {
    var totem = req.body.totemServer;
    if (totem == undefined) {
        res.status(400).send("Seu totem está undefined!");
    } else {

        dashboardModel.buscarInfoTotemComponente(totem)
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            cpu: resultadoAutenticar[0].cpu,
                            memoria: resultadoAutenticar[0].memoria,
                            disco: resultadoAutenticar[0].disco,
                            rede: resultadoAutenticar[0].rede,
                        });
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar buscar! Erro:", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarInfoComponente(req, res) {
    var totem = req.body.idTotemServer;
    if (totem == undefined) {
        res.status(400).send("Seu totem está undefined!");
    } else {

        dashboardModel.buscarInfoComponente(totem)
        .then(function (resposta) {
            res.status(200).send(resposta);
    
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function buscarInfoEspecificacao(req, res) {
    var totem = req.body.idtotemServer;
    if (totem == undefined) {
        res.status(400).send("Seu totem está undefined!");
    } else {

        dashboardModel.buscarInfoEspecificacao(totem).then(function (resposta) {
            res.status(200).send(resposta);
    
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function buscarEspecificacaoComponente(req, res) {
    var componente = req.body.idcomponenteServer;
    if (componente == undefined) {
        res.status(400).send("Seu componente está undefined!");
    } else {

        dashboardModel.buscarEspecificacaoComponente(componente).then(function (resposta) {
            res.status(200).send(resposta);
    
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        })
    }
}

// Controlador para inserir uma nova interrupção
function buscarInterrupcoes(req, res) {
    dashboardModel.buscarInterrupcoes().then(function (resposta) {
        res.status(200).send(resposta);
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}
// Controlador para contar o número total de interrupções
function contarInterrupcoes(req, res) {
    dashboardModel.contarInterrupcoes().then(function (resposta) {
        res.status(200).send(resposta);
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarUsuario(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nivelAcesso = req.body.nivelAcessoServer;
    var empresa = req.body.empresaServer;

    if (nome == undefined ||
        email == undefined ||
        senha == undefined ||
        empresa == undefined ||
        nivelAcesso == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.cadastrarUsuario(nome, email, senha, empresa, nivelAcesso)
            .then(function (resposta) {
                res.status(200).send("Usuário cadastrado com sucesso");
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function listarUsuarios(req, res) {
    var empresa = req.body.empresaServer

    dashboardModel.listarUsuarios(empresa).then(function (resposta) {
        res.status(200).send(resposta);

    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarInfoUsuario(req, res) {
    var id = req.body.idServer;
    if (id == undefined) {
        res.status(400).send("Seu usuario está undefined!");
    } else {

        dashboardModel.buscarInfoUsuario(id)
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            senha: resultadoAutenticar[0].senha,
                            tipo: resultadoAutenticar[0].tipo,
                        });
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar buscar! Erro:", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function deletarUsuario(req, res) {
    var id = req.body.idServer;

    if (id == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.deletarUsuario(id)
            .then(function (resposta) {
                res.status(200).send("Sucesso em deletar as visualizações do usuário");

            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}


function editarUsuario(req, res) {
    var id = req.body.idServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipo = req.body.tipoServer;

    if (id == undefined || nome == undefined || email == undefined || senha == undefined || tipo == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.editarUsuario(id, nome, email, senha, tipo)
            .then(function (resposta) {
                res.status(200).send("Sucesso em alterar os dados do usuário");

            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}



module.exports = {
    cadastrarTotem,
    cadastrarTotemComponetes,
    cadastrarComponentesTotem,
    cadastrarComponentesTotemDisco,
    listarTotens,
    deletarTotem,
    alterarTotem,
    alterarTotemComponente,
    alterarTotemRam,
    alterarComponenteEspecificacao,
    buscarInfoTotem,
    buscarInfoTotemComponente,
    buscarInfoComponente,
    buscarInfoEspecificacao,
    buscarEspecificacaoComponente,
    buscarInterrupcoes,
    contarInterrupcoes,
    cadastrarUsuario,
    listarUsuarios,
    buscarInfoUsuario,
    deletarUsuario,
    editarUsuario,
}