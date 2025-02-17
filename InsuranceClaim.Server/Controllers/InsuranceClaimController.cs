using InsuranceClaim.Server.Data;
using InsuranceClaim.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace InsuranceClaim.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsuranceClaimController : ControllerBase
    {
        private readonly InsuranceClaimDBContext _insuranceClaimDBContext;

        public InsuranceClaimController(InsuranceClaimDBContext insuranceClaimDBContext)
        {
            _insuranceClaimDBContext = insuranceClaimDBContext;
        }



        [HttpGet("Reserves")]
        public async Task<IActionResult> GetAllReserves()
        {
            var reserves = await _insuranceClaimDBContext.ReserveModel.ToListAsync();
            return Ok(reserves);
        }

        [HttpPost("Reserve/add")]
        public async Task<IActionResult> AddReserve([FromBody] ReserveModel reserveModelrequest)
        {
            reserveModelrequest.Id=Guid.NewGuid();
            await _insuranceClaimDBContext.ReserveModel.AddAsync(reserveModelrequest);
            await _insuranceClaimDBContext.SaveChangesAsync();
            return Ok(reserveModelrequest);
        }


        [HttpGet("Payments")]
        public async Task<IActionResult> GetAllPayments()
        {
            var payments = await _insuranceClaimDBContext.PaymentModel.ToListAsync();
            return Ok(payments);
        }

        [HttpGet("Reserve/{id:Guid}")]
        public async Task<IActionResult> GetReserve([FromRoute] Guid id)
        {
            var reserve = await _insuranceClaimDBContext.ReserveModel.FirstOrDefaultAsync(r => r.Id == id);
            if (reserve == null)
            {
                return NotFound();
            }
            return Ok(reserve);
        }

        [HttpPost("Payment/add")]
        public async Task<IActionResult> AddPayment([FromBody] PaymentModel paymentModelrequest)
        {
            var reserveCount = _insuranceClaimDBContext.ReserveModel.Count();
            if (reserveCount>0) {
                paymentModelrequest.Id = Guid.NewGuid();
                await _insuranceClaimDBContext.PaymentModel.AddAsync(paymentModelrequest);
                await _insuranceClaimDBContext.SaveChangesAsync();
                return Ok(paymentModelrequest);
            }

            return BadRequest("No reserves found to associate the payment."); 
        }

        [HttpPut("{id:Guid}")]
        public async Task<IActionResult> updateReserve([FromRoute] Guid id, ReserveModel updateReserveModelRequest)
        {
            var reserve = await _insuranceClaimDBContext.ReserveModel.FindAsync(id);
            if (reserve == null)
            {
                return NotFound();
            }

            reserve.ReserveDamage = updateReserveModelRequest.ReserveDamage;
            reserve.ReserveClaimantCost = updateReserveModelRequest.ReserveClaimantCost;
            reserve.ReserveDefenceCost = updateReserveModelRequest.ReserveDefenceCost;
            reserve.Status = updateReserveModelRequest.Status;
            reserve.StatusDate = updateReserveModelRequest.StatusDate;

            await _insuranceClaimDBContext.SaveChangesAsync();
            return Ok(reserve);
        }

    }
}



