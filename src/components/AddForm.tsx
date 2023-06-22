import { useForm } from 'react-hook-form';

// style
import './AddForm.scss'
import { TaskType, FormValues } from '../types';

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
  const {register, handleSubmit, formState: {errors}} = useForm<FormValues>()
  
  const formSubmit = (data: FormValues) => {
    
    if(checkData()) {
      if(props.editovatUlohu) {
  
        const novaUloha = {
          name,
          description,
          category,
          note,
          term,
          state
        }
  
        props.upravUlohu(novaUloha, props.formData.id)
  
      } else {
        const novaUloha = {
          name,
          description,
          category,
          note,
          term,
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
              message: 'Názov úlohy je potrebne zadať'
            }
          })}
          onChange={ (e) => props.setFormData({...props.formData, name: e.target.value})}
          value={name}
          placeholder='Názov'
        />
        <p className="error">{errors.nazov?.message}</p>

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
          {...register('kategoria', {
            required: {
              value:true,
              message: 'Kategóriu je potrebne zadať'
            }
          })}
          onChange={(e) => props.setFormData({...props.formData, category: e.target.value})}
          value={category}
          placeholder='Kategória' 
        />
        <p className="error">{errors.kategoria?.message}</p>

        <label htmlFor="poznamka">Poznámka:</label>
        <textarea
          id='poznamka'
          {...register('poznamka')}
          onChange={(e) => props.setFormData({...props.formData, note: e.target.value})}
          value={note}
          placeholder='Poznámka' 
        />

        <label htmlFor="termin">Termín (d.m.rrrr):</label>
        <input
          id='termin' 
          type="text" 
          {...register('termin', {
            required: {
              value: true,
              message: 'Termín treba zadať'
            },
            pattern: {
              value: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
              message: 'Neplatný dátum alebo formát (d.m.rrrr)'
            }
          })}
          onChange={(e) => props.setFormData({...props.formData, term: e.target.value})}
          value={term}
        />
        <p className="error">{errors.termin?.message}</p>
        
        <input type="submit" value="Pridať" />
        <input type="button" value="Zrušiť" onClick={Cancel}/>
      </form>
    </div> 
  )
}

export default AddForm