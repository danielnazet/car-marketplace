import React from "react";

function InfoSection() {
	return (
		<div>
			<section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
				<div className="p-8 md:p-12 lg:px-16 lg:py-24">
					<div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
						<h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
							Lorem, ipsum dolor sit amet consectetur adipisicing
							elit
						</h2>

						<p className="hidden text-black md:mt-4 md:block">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Et, egestas tempus tellus etiam sed. Quam a
							scelerisque amet ullamcorper eu enim et fermentum,
							augue. Aliquet amet volutpat quisque ut interdum
							tincidunt duis.
						</p>

						<div className="mt-4 md:mt-8">
							<a
								href="#"
								className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-600 hover:shadow-xl active:bg-blue-700 active:shadow-none"
							>
								Get Sell Your Car Today
							</a>
						</div>
					</div>
				</div>

				<img
					alt=""
					src="https://libertow.bmw-mcars.pl/www/media/72/img/x7_1200x1200b.jpg"
					className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end rounded-xl"
				/>
			</section>
		</div>
	);
}

export default InfoSection;
