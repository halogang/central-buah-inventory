import { FormInput } from "@/components/admin"
import { FormSignature } from "@/components/admin"

export default function DeliverySignatureSection({
    form,
    setForm,
    type
}: any) {

    return (

        <div className="p-4 border rounded-lg flex flex-col gap-2">

            <FormInput
                label={type === "in" ? "Nama Pengirim" : "Nama Penerima"}
                value={type === "in" ? form.sender_name : form.receiver_name}
                onChange={(e)=>{

                    if(type === "in"){
                        setForm({...form, sender_name:e.target.value})
                    }else{
                        setForm({...form, receiver_name:e.target.value})
                    }

                }}
            />

            <FormSignature
                label={type === "in" ? "Tanda Tangan Pengirim" : "Tanda Tangan Penerima"}
                value={type === "in" ? form.sender_signature : form.receiver_signature}
                onChange={(value: string | null)=>{

                    if(type === "in"){
                        setForm({...form, sender_signature:value})
                    }else{
                        setForm({...form, receiver_signature:value})
                    }
                }}

            />

        </div>

    )
}