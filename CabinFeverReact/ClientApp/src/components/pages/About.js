// About.js
import React from 'react';

const About = () => {
    return (
        <div>
            {/* Banner */}
            <div className="banner-secondary">
                <div className="banner-secondary-container">
                    {/* Midlertidig */}
                    <img src="https://images.pexels.com/photos/5365875/pexels-photo-5365875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Banner" />
                </div>
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle">
                        <div className="text-center">
                            {/* The text */}
                            <h1 className="text-white">About</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* About content */}
            <div className="container my-5">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut etiam sit amet nisl purus. Tristique sollicitudin nibh sit amet commodo
                    nulla facilisi. Tristique magna sit amet purus gravida. Aliquam id diam maecenas ultricies mi. Odio ut
                    enim blandit volutpat maecenas volutpat blandit aliquam. Auctor elit sed vulputate mi. Mauris cursus
                    mattis molestie a iaculis at erat. Varius sit amet mattis vulputate. Varius sit amet mattis vulputate.
                    At imperdiet dui accumsan sit amet nulla facilisi morbi. Urna cursus eget nunc scelerisque viverra
                    mauris in aliquam sem. Mi proin sed libero enim sed faucibus turpis in. Tristique senectus et netus et.
                    Id velit ut tortor pretium viverra suspendisse potenti nullam. Vitae et leo duis ut diam quam. Facilisi
                    cras fermentum odio eu feugiat pretium nibh ipsum consequat. Eget felis eget nunc lobortis.
                </p>

                {/* Add more paragraphs as needed */}
            </div>
        </div>
    );
};

export default About;
