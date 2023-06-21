import React from 'react';

export default function Feedback() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: 50,color: '#7f1d1d'}}>Feedback Page</h1>
      <p style={{ fontStyle: 'italic',color: '#7f1d1d' }}>We value your feedback</p>
      <div className='flex justify-center items-center py-2' style={{ fontSize: '200px' }}>
  <a href="https://www.google.com/?client=safari&channel=iphone_bm" target="_blank">
    <i class="fa-brands fa-google opacity-50 duration-300  hover:scale-150 hover:opacity-100 cursor-pointer"></i>
  </a>

  <span style={{ width: '200px' }}></span> {/* Empty space of 200px */}

  <a href="https://www.google.com/?client=safari&channel=iphone_bm" target="_blank">
    <i class="fa-solid fa-envelope opacity-50 duration-300 hover:scale-150 hover:opacity-100 hover:cursor-pointer"></i>
  </a>
</div>

      

      
    </div>
  );
}
