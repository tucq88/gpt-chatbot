export default function Prompt() {
    return (
        <div className="min-w-0 flex-1">
          <form action="#" className="relative">
            <div className="form-control">
            <br />
                <textarea className="textarea textarea-bordered h-24" placeholder="Enter your prompt"></textarea>
                <br />
            </div>
            <button className="btn">Submit</button>
          </form>
        </div>
    )
}