import Link from "next/link";
const page = () => {
  return (
    <div>
      <section>
        <div>
          <div className="text-center flex flex-col gap-4 mt-16">
            <h1 className="text-start md:text-center font-bold text-4xl text-primary">welcome to DDEV-COMPANY</h1>
            <span className="text-sm">Empowering CS Students and Businesses</span>
          </div>
          <div className="mt-16">
            <h1>for businesses</h1>
            <span className="text-sm">Elevate your learning experience by</span>
            <ul>
              <li>Reading insightful blogs created by industry professionals and peers</li>
              <li>Sharing your knowledge by publishing your own blogs.</li>
              <li>Showcasing your projects to potential collaborators and employers.</li>
            </ul>
          </div>
          <div className="mt-16">
            <h1>for students</h1>
            <span className="text-sm">Elevate your learning experience by</span>
            <ul>
              <li>Reading insightful blogs created by industry professionals and peers</li>
              <li>Sharing your knowledge by publishing your own blogs.</li>
              <li>Showcasing your projects to potential collaborators and employers.</li>
            </ul>
          </div>
          <div className="text-center mt-16">
            <h1>we offer our services from <span className="text-secondary">500rs.</span></h1>
          </div>
        </div>
      </section>
    </div>
  );
};  

export default page;
