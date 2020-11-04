const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
          //  return reject( new Error('DEU RUIM DE VERDADE'));
            return resolve( {
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            });
        }, 1000);
    });
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve( {
                telefone: '1193937363',
                ddd: 11
            })
        }, 2000);
    });
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 30
        });
    });
}

const usuarioPromise = obterUsuario();

usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result) {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id);
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        });
    })
    .then(function (resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua} ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `);
    })
    .catch(function (error) {
        console.log('DEU RUIM', error);
    });

// function resolverUsuario(erro, usuario) {
//     console.log('usuario', usuario);
// }

// obterUsuario(function resolverUsuario(error1, usuario) {
//     //null || 0 || "" = false
//     if (error1) {
//         console.log('Deu Ruim no ID do USUÁRIO.');
//         return;
//     } obterTelefone(usuario.id, function resolverTelefone(error2, telefone) {
//         if (error2) {
//             console.log('Deu ruim no TELEFONE.');
//             return;
//         }

//         obterEndereco(usuario.id, function resolverEndereco(error3, endereco) {
//             if(error3) {
//                console.log('Deu ruim no ENDERECO.');
//                return;
//             }

//             console.log(`
//                 Nome: ${usuario.id}
//                 Endereco: ${endereco.rua}, ${endereco.numero}
//                 Telefone: ${telefone.ddd} ${telefone.telefone}
//             `)
//         })
//     })
//  });
