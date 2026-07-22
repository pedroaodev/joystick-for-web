# Joystick for Web

Este projeto cria um joystick visual para páginas web usando JavaScript puro.  
Ele permite detectar movimentos do usuário com mouse ou touch e atualizar a direção do controle na interface.

## Estrutura principal

A classe principal é `Joystick`, definida em `joystick.js`.

### Construtor

O construtor recebe um objeto com a opção `Options`:

- `target`: elemento HTML onde o joystick será adicionado;
- `idController`: ID do elemento do joystick;
- `locked`: define se o joystick fica preso em uma posição fixa;
- `lockPosition`: posição fixa para o joystick quando `locked` estiver ativo;
- `autoHidden`: opção presente no código, mas ainda não utilizada na implementação atual.

## Métodos principais

### `setDirection(x, y)`
Calcula a direção com base no movimento do usuário e marca a seta correspondente como ativa.

### `startJoystick(e)`
Inicia o gesto do joystick. Armazena a posição inicial e mostra o controle.

### `moveJoystick(e)`
Atualiza a posição do indicador enquanto o usuário arrasta o joystick.

### `stopJoystick()`
Encerra o gesto, volta o indicador para a posição inicial e remove a seta ativa.

### `loadJoystick()`
Adiciona o joystick ao DOM e registra os eventos de mouse e touch.

### `ejectJoystick()`
Remove os listeners do documento para parar de responder aos eventos.

## Exemplo de uso

```html
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Joystick Example</title>
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000000;
    }
  </style>
</head>
<body>
  <div id="joystick-root"></div>

  <script src="joystick.js"></script>
  <script>
    const joystick = new Joystick({
      options: {
        target: document.getElementById('joystick-root'),
        idController: 'joystick',
        locked: false,
        lockPosition: { x: 0, y: 0 },
        autoHidden: false
      }
    });

    joystick.loadJoystick();
  </script>
</body>
</html>