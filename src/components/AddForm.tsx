import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

// style
import './AddForm.scss'
import { TaskType } from '../types';

type FormValues = {
  nazov: string
  popis: string
  kategoria: string
  poznamka: string
  termin: string
}

const odstranDiakritiku = (text: string) => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ---vráti aktuálny dátum---
const dajDatum = () => {
  const teraz = new Date()
  
  return (
    teraz.getDate() + '.' + (teraz.getMonth() + 1) + '.' + teraz.getFullYear()
  )
}// -------------------------

// formátuje dátum, vstupný dátum musí byť vo formáte yyyy-mm-dd, namiesto '-' môže byť aj iný znak, ale iba jeden
const formatujDatum = (datum: string) => {
  let novyDatum = ""

  if(datum) {
    novyDatum = datum.slice(-2) + "." + datum.slice(5,7) + "." +  datum.slice(0,4)
  }

  return novyDatum
}// -------------------------

type Props = {
  pridajUlohu: (data: object) => void
  setPridatUlohu: any
  upravUlohu: (data: object, id: string) => void
  zoznamUloh: never[]
  formData: TaskType
  setFormData: any
  editovatUlohu: boolean
  setEditovatUlohu: any
}

const checkData = () => {
  // TODO: doplniť overenie údajov, pozri onenote
  return true
}

const AddForm = (props: Props) => {
  const {name, description, category, term, state, note} = props.formData
  const {register, control, handleSubmit, formState: {errors}} = useForm()
  
  const formSubmit = (e: any) => {
    e.preventDefault()
    
    if(checkData()) {
      if(props.editovatUlohu) {
  
        const novaUloha = {
          name,
          description,
          category,
          note,
          term: formatujDatum(term),
          state
        }
  
        props.upravUlohu(novaUloha, props.formData.id)
        // TODO: Doplniť editáciu úlohy, ktorú fciu má spustiť, fcia bude v Main
  
      } else {
        const novaUloha = {
          name,
          description,
          category,
          note,
          term: formatujDatum(term),
          state,
          created: dajDatum(),
        }
        props.pridajUlohu(novaUloha)
      }
  
      //vymazanie formulára
      ClearForm()
    }
  } 

  // tlačidlo Zrušiť
  const Cancel = () => {
    props.setPridatUlohu(false)
    props.setEditovatUlohu(false)
    ClearForm()
  }

  const ClearForm = () => {
    props.setFormData({
      id : '',
      created : '',
      name : '',
      description : '',
      category : '',
      term : '',
      state : '',
      note : ''
    })
  }

  return (
    <div>
      <form onSubmit={ handleSubmit(formSubmit) } className='add-form' noValidate>
        <label htmlFor='nazov'>Názov úlohy:</label>
        <input
          id='nazov'
          type='text'
          {...register('nazov', {
            required: {
              value:true,
              message: 'Názov je potrebne zadať'
            }
          })}
          onChange={ (e) => props.setFormData({...props.formData, name: e.target.value})}
          value={name}
          placeholder='Názov'
        />
        {/*<p className="error">{errors.nazov?.message}</p>*/}

        <label htmlFor="popis">Popis úlohy:</label>
        <textarea
          id='popis'
          {...register('popis')}
          onChange={(e) => props.setFormData({...props.formData, description: e.target.value})}
          value={description}
          placeholder='Popis' 
        />

        <label htmlFor="kategoria">Kategória:</label>
        <input
          id='kategoria'
          type="text" 
          {...register('kategoria')}
          onChange={(e) => props.setFormData({...props.formData, category: e.target.value})}
          value={category}
          placeholder='Kategória' 
        />

        <label htmlFor="poznamka">Poznámka:</label>
        <textarea
          id='poznamka'
          {...register('poznamka')}
          onChange={(e) => props.setFormData({...props.formData, note: e.target.value})}
          value={note}
          placeholder='Poznámka' 
        />

        <label htmlFor="termin">Termín:</label>
        <input
          id='termin' 
          type="date" 
          {...register('termin')}
          onChange={(e) => props.setFormData({...props.formData, term: e.target.value})}
          value={term}
        />
        
        <input type="submit" value="Pridať" />
        <input type="button" value="Zrušiť" onClick={Cancel}/>
      </form>
      <DevTool control={control}/>
    </div> 
  )
}

export default AddForm