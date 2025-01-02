import Link from "next/link";
const page = () => {
  return (
    <div>
      <section>
        <div>
          <div className="text-center flex flex-col gap-4 mt-16">
            <h1 className="text-start md:text-center font-bold text-4xl text-primary">I develop websites and custom programming scripts</h1>
            <div className="flex items-center gap-2 justify-center">
              <Link href={'/business'} className="border rounded-full px-8 py-2 border-background-100">
                <div>
                  <span>business</span>
                </div>
              </Link>
              <Link href={'/business/contact-form'} className="border rounded-full px-8 py-2 border-background-100">
                <div>
                  <span>contact</span>
                </div>
              </Link>
            </div>
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
