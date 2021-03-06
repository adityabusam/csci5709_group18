/**
 *
 * @version 1.0
 * @author [Dhruv Soni](dh554152@dal.ca)(Banner ID:-B00867642)
 */

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";

import { useNavigate } from "react-router-dom";
import { API } from "../../Constants/api";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { CardActionArea } from "@material-ui/core";

//function for displaying products 
const Products = (propS) => {
  const [productError, setProductError] = useState("");//state for handling error message coming as response
  let navigate = useNavigate();
  const [med, setMed] = useState([]);//state for handling display of medicines
  useEffect(() => {
    //UseEffect will only call once
    fetch(`${API}/Products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((medicines) => {
        console.log(medicines.success);
        if (medicines.success === true) {
          setMed(medicines.medicineRecord);
        } else {
          setProductError(medicines.message);
        }
      });
  }, []);
  const productDisplay = (id) => {
    navigate(`/ProductDisplay/${id}`);
  };

  return med && med.length > 0 ? (
    <Layout>
      <Grid sx={{ flexGrow: 1 }} style={{ marginBlockStart: "20px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {med.map((medy) => {
            return (
              <Grid item xs={4} sm={4} md={4}>
                <Card variant="outlined" sx={{ maxwidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      onClick={() => {
                        productDisplay(medy._id);
                      }}
                      component="img"
                      height="250"
                      image={medy.ImageURL}
                      alt="green iguana"
                    />
                    <CardContent
                      style={{
                        backgroundColor: "#11999E",
                        color: "white",
                      }}
                      onClick={() => {
                        productDisplay(medy._id);
                      }}
                    >
                      <Typography gutterBottom align="center" >Name:{medy.Name}</Typography>
                      <Typography gutterBottom align="center" >Brand:{medy.Brands}</Typography>
                      <Typography gutterBottom align="center"  >Dose:{medy.Dose}</Typography>
                      <Typography gutterBottom align="center" >Price:${medy.Price}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Layout>
  ) : (
    <Layout>
      <Typography>{productError}</Typography>
    </Layout>
  );
};

export default Products;
