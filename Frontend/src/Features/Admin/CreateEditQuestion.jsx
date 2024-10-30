import tw from "tailwind-styled-components"
import { useForm } from "react-hook-form";

import { LuSubtitles } from "react-icons/lu";
import { SlOptionsVertical } from "react-icons/sl";
import { SiAnswer } from "react-icons/si";
import { MdCategory } from "react-icons/md";
import { IoIosWarning, IoMdCloseCircle } from "react-icons/io";

import { useCreateNewQuestion } from "./useCreateNewQuestion";
import { useEditQuestion } from "./useEditQuestion";

import Overlay from "../../UI/Overlay";
import InputIcon from "../../UI/InputIcon";
import InputBox from "../../UI/InputBox";
import Button from "../../UI/Button";
import Loading from "../../UI/Loading";

const InputContainer = tw.div`
    w-full 
    flex
    flex-col
    xl:flex-row 
    justify-center
    items-center 
    gap-6
`

const Input = tw.input`
    px-10 
    py-[9px] 
    text-mediumColor  
    border-gray-500 
    border-2 
    bg-darkColor  
    outline-none 
    rounded-md  
    relative 
    xl:w-[85%]
    w-full
`

const ErrorBox = tw.div`
    capitalize 
    text-lightColor 
    flex 
    items-center 
    justify-center 
    xl:w-2/3
`

const ErrorText = tw.p`
    text-red-400
    text-xs
`

const Textarea = tw.textarea`
    px-10 
    py-[9px] 
    text-mediumColor  
    border-gray-500 
    border-2 
    bg-darkColor  
    outline-none 
    rounded-md  
    relative 
    h-48
    xl:w-[85%]
    w-full
`

const TextareaIcon = tw.div`
    text-lightColor 
    absolute 
    top-4 
    left-5 
`

function CreateEditQuestion({ handleCloseModalCreateEdit , questionToEdit = {}}) {

    const {_id : id , ...editValues} = questionToEdit;
    const isEdit = Boolean(id);

    const { handleSubmit, register, formState , reset } = useForm({
        defaultValues : questionToEdit ? editValues : {}
    });
    const { errors } = formState;

    const {createNewQuestion , isCreatingNewQuestion} = useCreateNewQuestion();
    const {editQuestion , isEditing} = useEditQuestion();

    function compareEditData(newData , oldData) {
        const changedData = {};
        Object.keys(newData).forEach(key => {
            if (newData[key] !== oldData[key]) {
                changedData[key] = newData[key];
            }
        });
        return changedData;
    }

    function handleSubmitFunction(data) {
        console.log(data)
        const {question , options , answer , category} = data;
        console.log(typeof options)
        const separatedOptions = typeof options === "string" ? options.split(/[/,]/) : options;
        console.log(separatedOptions)

        const finalData = {
            options : separatedOptions,
            question ,
            answer ,
            category 
        }

        if(isEdit) {
            compareEditData(finalData,editValues)
            editQuestion({id , finalData} , {
                onSettled:() => handleCloseModalCreateEdit()
            })
        }
        else{
            createNewQuestion(finalData , {
                onSuccess : () => handleCloseModalCreateEdit(),
                onError : () => reset()
            })
        }

    }

    if(isCreatingNewQuestion || isEditing) return <Loading />

    return <Overlay>
        <div className="md:w-3/4 h-full bg-darkestColor py-16 px-6 md:p-16 rounded-2xl relative overflow-y-scroll xl:overflow-y-auto">
            <div className="absolute right-0 top-0 text-mediumColor text-5xl p-5 ">
                <IoMdCloseCircle className="cursor-pointer" onClick={handleCloseModalCreateEdit} />
            </div>
            <form className="flex flex-col justify-center gap-12 w-full" onSubmit={handleSubmit(handleSubmitFunction)}>
                <InputBox>
                    <InputContainer >
                        <label htmlFor="" className="text-white xl:w-2/6 text-center xl:text-left">Question Title</label>
                        <div className=" relative w-full">
                            <Input type="text" placeholder="Question Title" {...register("question", {
                                required: "please enter amount of points for this question"
                            })} />
                            <InputIcon>
                                <LuSubtitles />
                            </InputIcon>
                        </div>
                        <ErrorBox >
                            <ErrorText>{errors?.question?.message}</ErrorText>
                        </ErrorBox>
                    </InputContainer>
                </InputBox>

                <InputBox>
                    <InputContainer>
                        <label htmlFor="" className="text-white xl:w-2/6 text-center xl:text-left">Question Options</label>
                        <div className=" relative w-full">
                            <Textarea type="text" placeholder="Question Options" {...register("options", {
                                required: "please enter options of the question (including the answer)"
                            })} />
                            <TextareaIcon>
                                <SlOptionsVertical />
                            </TextareaIcon>
                        </div>
                        <ErrorBox>
                            <ErrorText >{errors?.options?.message}</ErrorText>
                        </ErrorBox>
                    </InputContainer>
                    <div>
                        <p className="uppercase flex items-center text-red-400 gap-2 text-center mt-7 leading-8"><IoIosWarning className="text-9xl lg:text-7xl"/> <span>you need to separate each option with ( / OR , ) between every option, and do not put ( / OR , ) in the end! + options and answer should be lowercase</span></p>
                    </div>
                </InputBox>

                <InputBox>
                    <InputContainer>
                        <label htmlFor="" className="text-white xl:w-2/6 text-center xl:text-left">Question Answer</label>
                        <div className=" relative w-full">
                            <Input type="text" placeholder="Question Answer" {...register("answer", {
                                required: "please enter the answer of the question (should be one of the options)"
                            })} />
                            <InputIcon>
                                <SiAnswer />
                            </InputIcon>
                        </div>
                        <ErrorBox>
                            <ErrorText>{errors?.answer?.message}</ErrorText>
                        </ErrorBox>
                    </InputContainer>
                </InputBox>

                <InputBox>
                    <InputContainer>
                        <label htmlFor="" className="text-white xl:w-2/6 text-center xl:text-left">Question Category</label>
                        <div className=" relative w-full">
                            <Input type="text" placeholder="Question Category" {...register("category", {
                                required: "please enter question's category"
                            })} />
                            <InputIcon>
                                <MdCategory />
                            </InputIcon>
                        </div>
                        <ErrorBox>
                            <ErrorText>{errors?.category?.message}</ErrorText>
                        </ErrorBox>
                    </InputContainer>
                </InputBox>

                <div className="flex items-center justify-center xl:justify-end">
                    <Button variation="confirm" size="primary">{isEdit ? "edit question" : "add question"}</Button>
                </div>
            </form>
        </div>
    </Overlay>
}
// 
export default CreateEditQuestion;