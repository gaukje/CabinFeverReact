// About.js
import React from 'react';

const About = () => {
    return (
        <div>
            {/* Banner */}
            <div className="banner-secondary">
                <div className="banner-secondary-container">
                    {/* Midlertidig */}
                    <img src="https://images.pexels.com/photos/5365875/pexels-photo-5365875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" id="banner-image" alt="Banner" />

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
            <div className="container my-5 w-75 pb-5">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel
                    justo non enim bibendum ullamcorper. Proin dapibus facilisis ante, eu
                    efficitur felis eleifend ac. Vivamus auctor mauris nec elit malesuada, eget
                    aliquet sapien feugiat. Maecenas nec ullamcorper arcu, nec facilisis justo.
                    Sed ut urna non purus lacinia convallis. Etiam consequat libero vel felis
                    vehicula, a bibendum enim faucibus. In eget nunc eu felis aliquam cursus.
                    Nullam in scelerisque justo.
                </p>
                <p>
                    Sed vel nisl in massa consectetur bibendum vel vel ante. Nam nec justo
                    lacinia, feugiat nunc vel, vehicula dui. Suspendisse id hendrerit justo, vel
                    hendrerit urna. Sed non tincidunt nulla. Nulla facilisi. Sed in nisl ut purus
                    tincidunt gravida nec eu massa. Nunc id purus eu enim eleifend vehicula. Etiam
                    ut urna eu lectus egestas interdum.
                </p>
                <p>
                    Vestibulum tempus quam eu urna euismod, quis rhoncus quam ultrices. Suspendisse
                    ullamcorper efficitur odio, non vulputate erat cursus in. Maecenas euismod quam
                    vel sapien euismod, vel dictum odio dignissim. Vestibulum feugiat vestibulum
                    justo, eu bibendum dui tristique a. Fusce eleifend, nulla eget congue blandit,
                    arcu quam laoreet massa, eget posuere erat enim at est. Donec euismod ultrices
                    tellus, at laoreet sapien feugiat non. In dapibus viverra scelerisque.
                </p>
                <p>
                    Praesent eget nulla sit amet quam bibendum feugiat. Aliquam eget arcu ac enim
                    tincidunt rhoncus. Proin in odio a odio tincidunt scelerisque. Nulla facilisi.
                    Sed condimentum metus eu arcu tincidunt, non congue tortor facilisis. Sed
                    hendrerit, ex eu suscipit suscipit, enim ligula facilisis ex, id cursus purus
                    felis eu est. Nunc sed luctus erat.
                </p>
                <p>
                    Fusce vitae ex sit amet justo fringilla fringilla. Pellentesque nec velit
                    nec dolor ullamcorper bibendum. Sed posuere dapibus quam, eu finibus ex rhoncus
                    in. Integer sit amet libero nec metus gravida vehicula. Morbi nec metus nec ex
                    efficitur ullamcorper. Sed at libero id enim dapibus dignissim. Integer pharetra
                    libero vitae purus lacinia efficitur. Sed auctor libero sit amet arcu consequat,
                    eget vehicula libero sodales. Suspendisse sit amet libero risus. Proin commodo
                    risus eu orci suscipit, eu vestibulum justo suscipit. Sed hendrerit, erat non
                    tincidunt facilisis, metus odio cursus augue, nec auctor neque elit ac nulla.
                    Curabitur vel volutpat ligula. Sed vel massa at mauris ullamcorper lacinia.
                </p>
            </div>
        </div>
    );
};

export default About;
