import React, { useState } from 'react';
import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  /* 
  const currentUser = {
    id: 1,
    username: 'Yasin',
    isSeller: false,
  };
*/
  // const currentUser = null; //

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = async () => {
    try {
      await newRequest.post('/auth/logout');
      localStorage.setItem('currentUser', null);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link className='link' to='/'>
            <span className='text'>Fiverr</span>
            <span className='dot'>.</span>
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to='/'>
            <span>Fiverr Business</span>
          </Link>
          <Link className='link' to='/'>
            <span>Explore</span>
          </Link>
          <Link className='link' to='/'>
            <span>English</span>
          </Link>
          {!currentUser?.isSeller && (
            <Link className='link' to='/'>
              <span>Become a Seller</span>
            </Link>
          )}
          {currentUser ? (
            <div onClick={() => setOpen(!open)} className='user'>
              <img src={currentUser.img || '/noavatar.jpg'} alt='' />
              <span>{currentUser?.username}</span>
              {open && (
                <div className='options'>
                  {currentUser.isSeller && (
                    <>
                      <Link className='link' to='/mygigs'>
                        Gigs
                      </Link>
                      <Link className='link' to='/add'>
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className='link' to='/orders'>
                    Orders
                  </Link>
                  <Link className='link' to='/messages'>
                    Messages
                  </Link>
                  <Link onClick={handleLogout} className='link' to='/'>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link className='link' to='/login'>
                <span>Sign in</span>
              </Link>
              <Link className='link' to='/register'>
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
