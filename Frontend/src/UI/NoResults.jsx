import tw from "tailwind-styled-components";

const NoResultsStyle = tw.div`
    flex 
    items-center 
    justify-center 
    w-full 
    h-full 
    text-lightColor 
    text-4xl 
    sm:text-6xl 
    capitalize 
    font-bold 
    text-center 
    italic
`

function NoResults({ children }) {
    return <NoResultsStyle >{children}</NoResultsStyle>
}
export default NoResults;
