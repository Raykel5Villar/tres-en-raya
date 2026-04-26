import confetti from "canvas-confetti"
import { useState } from "react"
import licey from './images/Licey.png'
import escogido from './images/Escogido.png'
import merengue from './images/Merengue.png'
import bachata from './images/Bachata.png'

const TURNS = {
  X: "x",
  O: "o"
}

const Square = ({children, is_selected, update_board, index}) => {
  const class_name = `square ${is_selected ? 'is-selected' : ''}`

  const handle_click = () => {
    update_board(index)
  }
  return (
  <div onClick= {handle_click} className={class_name}>
    {children}
  </div>
)}

const winner_combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const temas = {
  lidom: "lidom",
  music: "music"
}


function App() {

  const [board, set_board] = useState(Array(9).fill(null))

  // null es que no hay ganador, false es que hay un empate
  const [winner, set_winner] = useState(null)

  const [tema, set_tema] = useState(temas.lidom)

  const get_symbol = (value) => {
    if (!value) return null

    if (tema === temas.lidom) {
      return value === TURNS.X
        ? <img src={licey} className="piece" />
        : <img src={escogido} className="piece" />
    }

    if (tema === temas.music) {
      return value === TURNS.X
        ? <img src={merengue} className="piece" />
        : <img src={bachata} className="piece" />
    }

    return value
  }

  const [turn, set_turn] = useState(TURNS.X)

  const check_winner = (board_to_check) => {
    for (const combo of winner_combos) {
      const [a, b, c] = combo
      if (
        board_to_check [a] && 
        board_to_check[a] === board_to_check[b] && 
        board_to_check[a] === board_to_check[c]
      ) {
        return board_to_check[a]
      }
    }
    
  }

  const reset_game = () => {
    set_board(Array(9).fill(null))
    set_turn(TURNS.X)
    set_winner(null)
  }

  const check_end_game = (new_board) => {
    return new_board.every((square) => square != null)
  }

  const update_board = (index) => {
    // si ya tiene algo 
    if (board[index] || winner) return

    // actualizar el tablero
    const new_board = [...board]
    new_board[index] = turn
    set_board(new_board)

    // cambiar de turno
    const new_turn = turn === TURNS.X ? TURNS.O: TURNS.X
    set_turn(new_turn)

    //Revisar si hay un ganador
    const new_winner = check_winner(new_board)
    if (new_winner) {
      confetti()
      set_winner(new_winner)
    } 
    else if (check_end_game(new_board)) {
      set_winner(false)
    }
  }


  return (
    <main className={`board theme-${tema}`}>
      

      <section className="controls">
        <h1>Tres En Raya</h1>
        <button onClick={reset_game}>Reiniciar</button>

        <section className="turn">
          <Square is_selected={turn === TURNS.X}>
            {get_symbol(TURNS.X)}
          </Square>
          <Square is_selected={turn === TURNS.O}>
            {get_symbol(TURNS.O)}
          </Square>
        </section>
      </section>

      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square key={index} index={index} update_board={update_board}>
                {get_symbol(board[index])}
              
              </Square>
            )
          })
        }

        
      </section>

      <section>
        {winner != null && (
          <section className="winner"> 
            <div className="text">
              <h2>
                {
                  winner === false 
                    ? 'Empate'
                    : 'Gano'
                }
              </h2>
              
              <header className="win">
                {winner && <Square>{get_symbol(winner)}</Square>}
              </header>
              

              <footer>
                <button onClick={reset_game}>Empezar De Nuevo</button>
              </footer>

            </div>
          </section>
        ) 
        }
      </section>
      
      <section className="theme-selector"> 
        <button onClick={() => set_tema(temas.lidom)}>⚾ LIDOM</button> 
        <button onClick={() => set_tema(temas.music)}>🎶 Música</button> 
      </section>

    </main>
  )
}

export default App
